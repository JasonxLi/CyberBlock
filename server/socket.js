const mysql_queries = require("./mysql_queries");

module.exports = {
	handleEvents: function (socket, app, io, db_connection) {
		socket.on(
			"host_create_lobby",
			(
				{
					nbOfTeams,
					nbOfRounds,
					nbOfDefenses,
					timeForEachRound,
					userEarnings,
					hasTriviaRound,
					difficulty,
				},
				ack
			) => {
				const lobbyId = Math.ceil(Math.random() * 10000).toString();

				//initialize lobby
				app.locals[lobbyId] = {};
				app.locals[lobbyId].hostId = socket.id;
				app.locals[lobbyId].previousTriviaQuestionIds = [];
				app.locals[lobbyId].submittedTriviaAnswers = Array(nbOfTeams).fill(null);

				//store lobby configuration info
				app.locals[lobbyId].nbOfTeams = nbOfTeams;
				app.locals[lobbyId].nbOfRounds = nbOfRounds;
				app.locals[lobbyId].nbOfDefenses = nbOfDefenses;
				app.locals[lobbyId].timeForEachRound = timeForEachRound;
				app.locals[lobbyId].userEarnings = userEarnings;
				app.locals[lobbyId].hasTriviaRound = hasTriviaRound;
				app.locals[lobbyId].difficulty = difficulty;

				//initialize team arrays
				app.locals[lobbyId].teamInfo = [];
				app.locals[lobbyId].boughtDefenses = [];
				for (i = 0; i < nbOfTeams; i++) {
					app.locals[lobbyId].teamInfo.push([]);
					app.locals[lobbyId].boughtDefenses.push([]);
				}

				//join host to lobby
				socket.join(lobbyId);
				console.log(`Host with socketID ${socket.id} joined lobby ${lobbyId}`);
				//ack with lobbyId
				ack(lobbyId);
			}
		);

		socket.on("student_join_lobby", ({ lobbyId, alias }, ack) => {
			//add student to a team with least members
			let nbOfMembers = 9999;
			let teamWithLeastMembers = null;
			for (i = app.locals[lobbyId].nbOfTeams - 1; i >= 0; i--) {
				if (app.locals[lobbyId].teamInfo[i].length <= nbOfMembers) {
					nbOfMembers = app.locals[lobbyId].teamInfo[i].length;
					teamWithLeastMembers = i;
				}
			}
			app.locals[lobbyId].teamInfo[teamWithLeastMembers].push({
				socketId: socket.id,
				alias: alias,
			});

			//add student to lobby
			socket.join(lobbyId);
			console.log(`Student with socketId ${socket.id} joined lobby ${lobbyId}`);

			//emit to members already in the room with updated teamInfo
			io.in(lobbyId).emit(
				"new_student_joined_lobby",
				app.locals[lobbyId].teamInfo
			);

			//ack to newly joined student, with configuration and teamInfo
			ack({
				nbOfTeams: app.locals[lobbyId].nbOfTeams,
				nbOfRounds: app.locals[lobbyId].nbOfRounds,
				nbOfDefenses: app.locals[lobbyId].nbOfDefenses,
				timeForEachRound: app.locals[lobbyId].timeForEachRound,
				userEarnings: app.locals[lobbyId].userEarnings,
				hasTriviaRound: app.locals[lobbyId].hasTriviaRound,
				difficulty: app.locals[lobbyId].difficulty,
				teamInfo: app.locals[lobbyId].teamInfo,
			});
		});

		socket.on(
			"host_move_student",
			({ lobbyId, socketId, oldTeamId, newTeamId }) => {
				// console.log(lobbyId, socketId, oldTeamId, newTeamId);
				const oldTeam = app.locals[lobbyId].teamInfo[oldTeamId];
				const newTeam = app.locals[lobbyId].teamInfo[newTeamId];
				let alias = null;
				//remove student from old team
				oldTeam.forEach((item, index) => {
					if (item.socketId === socketId) {
						alias = item.alias;
						oldTeam.splice(index, 1);
					}
				});
				//add student to new team
				newTeam.push({ socketId: socketId, alias: alias });

				//emit updated teamInfo to lobby
				io.in(lobbyId).emit(
					"host_moved_student",
					app.locals[lobbyId].teamInfo
				);
			}
		);

		socket.on("host_start_game", (lobbyId) => {
			//add each team member to their team socket room for chat
			app.locals[lobbyId].teamInfo.forEach((item, index) => {
				item.forEach((item) => {
					app.locals.sockets.get(item.socketId).join(lobbyId + "_team" + index);
				});
			});
			//emit event so front end knows game has been started when they receive this event
			io.in(lobbyId).emit("host_started_game", app.locals[lobbyId].hasTriviaRound);
		});

		socket.on("host_gets_trivia_question", async (lobbyId, ack) => {
			//to ensure we don't get duplicates and we don't query the database 10 times for a trivia question
			const numberOfTriviaQuestions =
				await mysql_queries.getNumberOfTriviaQuestions(db_connection);

			let newTriviaId;
			do {
				newTriviaId =
					Math.floor(Math.random() * numberOfTriviaQuestions.Count) + 1;
				newTriviaId = "300" + newTriviaId;
			} while (
				app.locals[lobbyId].previousTriviaQuestionIds.includes(newTriviaId)
			);

			const triviaQuestion = await mysql_queries.getTriviaQuestion(
				db_connection,
				newTriviaId
			);
			app.locals[lobbyId].previousTriviaQuestionIds.push(newTriviaId);

			app.locals[lobbyId].triviaQuestionAnswer = triviaQuestion.Answer;
			app.locals[lobbyId].submittedTriviaAnswers = [];

			io.in(lobbyId).emit("student_receives_trivia_question", triviaQuestion);
			ack(triviaQuestion);
		});

		socket.on(
			"student_submit_trivia_answer",
			({ lobbyId, teamId, triviaAnswer }, ack) => {
				const triviaReward = 5;

				app.locals[lobbyId].submittedTriviaAnswers[teamId] = triviaAnswer;
				io.in(lobbyId).emit("student_submitted_trivia_answer", app.locals[lobbyId].submittedTriviaAnswers);

				if (triviaAnswer === app.locals[lobbyId].triviaQuestionAnswer) {
					ack({
						triviaReward: triviaReward,
					});
				} else {
					ack({
						triviaReward: 0,
					});
				}
			}
		);

		socket.on("host_ends_trivia_round", lobbyId => {
			io.in(lobbyId).emit("host_ended_trivia_round");
		})

		socket.on("host_start_buy_phase", async (lobbyId) => {
			const defenses = await mysql_queries.getDefenses(
				db_connection,
				app.locals[lobbyId].difficulty
			);
			io.in(lobbyId).emit("student_receive_defenses", defenses);
		});

		socket.on("student_buy_defenses", ({ lobbyId, teamId, defenses }) => {
			app.locals[lobbyId].boughtDefenses[teamId] = defenses;
			io.in(lobbyId).emit("student_bought_defenses", app.locals[lobbyId].boughtDefenses);
		})

		socket.on("host_start_next_defense_round", async (ack) => {
			//TODO: figure out the format for this w/ Nelson
			const attackCategory = await mysql_queries.rollAttackCategory(
				db_connection
			);
			ack(attackCategory);
		});

		socket.on("host_pick_attack", async (lobbyId, attackCategory, attackId) => {
			//TODO: figure out how exactly to implement this
			app.locals[lobbyId].attackId = attackId;
			io.in(lobbyId).emit("student_receive_attack_category", attackCategory);

			const bestDefenses = await mysql_queries.getBestDefenses(
				db_connection,
				attackId
			);

			setTimeout(() => {
				//TODO: query database to check locally stored answer
				io.in(lobbyId).emit("student_receive_results", result, bestDefenses);
			}, app.locals[lobbyId].timeForEachRound * 1000);
		});

		socket.on("student_play_defenses", (lobbyId, teamId, defenses) => {
			//TODO: store defenses for each team
		});

		socket.on("chat_sendToAll", ({ lobbyId, alias, message }) => {
			io.in(lobbyId).emit("chat_receiveFromAll", {
				alias: alias,
				message: message,
			});
		});

		socket.on("chat_sendToTeam", ({ lobbyId, alias, teamId, message }) => {
			io.in(lobbyId + `_team` + teamId).emit("chat_receiveFromTeam", {
				alias: alias,
				message: message,
			});
		});

		socket.on(
			"receive_points_per_round",
			async ({ lobbyId, defenseID, attackID, teamNumber }, ack) => {
				const points = await mysql_queries.getPoints(
					db_connection,
					defenseID,
					attackID,
					teamNumber
				);

				for (let i = 0; i < points.length; i++) {
					const singlePoint = points[i].PointValue;
					console.log(singlePoint);
					ack({
						rewardPoint: singlePoint,
						teamIndex: teamNumber,
					});
				}
			}
		);

		// --------------------old socket events-------------------- //
		socket.on("join_lobby", (lobbyId) => {
			socket.join(lobbyId);
			console.log(`User with ID ${socket.id} joined lobby ${lobbyId}`);
		});

		socket.on("create_lobby", () => {
			const lobbyId = Math.ceil(Math.random() * 10000).toString();
			socket.emit("create_lobby", lobbyId);
			socket.join(lobbyId);
			console.log(`User with ID ${socket.id} joined lobby ${lobbyId}`);
		});

		socket.on("roll", async (lobbyId) => {
			const attack = await mysql_queries.getAttack(db_connection, 1);
			// console.log(attack.Name);
			io.in(lobbyId).emit("receive_roll", attack);
		});

		socket.on("start_buy_phase", async (lobbyId) => {
			const defenses = await mysql_queries.getDefenses(db_connection, 1);
			io.in(lobbyId).emit("receive_defense_cards", defenses);
			// const points = await mysql_queries.getPoints(db_connection, 1);
			// io.in(lobbyId).emit("receive_point_table", points);
		});

		// --------------------old socket events-------------------- //
	},
};
