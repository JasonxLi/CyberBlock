import React, { createContext, useState, useEffect, useContext } from "react";

import io from "socket.io-client";
//establishes a socket io connection to the server
const socket = io.connect("http://localhost:3001");

export const Context = createContext({});

const ThemeContextProvider = ({ children }) => {

	const [gameStage, setGameStage] = useState('CONFIG');

	const [nbOfTeams, setNbOfTeams] = useState(2);
	const [nbOfRounds, setNbOfRounds] = useState(5);
	const [timeForEachRound, setTimeForEachRound] = useState(120);
	const [hasTriviaRound, setHasTriviaRound] = useState(true);
	const [difficulty, setDifficulty] = useState(1);
	//TODO 
	const [nbOfDefenses, setNbOfDefenses] = useState(2);

	// a state that decides whether a player is host or student ans puts them in a correct interface
	const [isHost, setIsHost] = useState(false);
	// a state to see if users are in the set lobby or not
	const [isInLobby, setIsInLobby] = useState(false);
	//a state that holds the alias of each player that joined
	const [alias, setAlias] = useState("");
	//state that hold the lobbyId created by the host
	const [lobbyId, setLobbyId] = useState("");
	// a state to store all team information once student joins and host moves the players
	const [teamInfo, setTeamInfo] = useState([]);
	const [myTeamId, setMyTeamId] = useState(-1);
	const [isTeamLeader, setIsTeamLeader] = useState(false);
	const [teamLeader, setTeamLeader] = useState();

	//a state to hold trivia questions
	const [triviaQuestion, setTriviaQuestion] = useState();
	const [triviaAnswer, setTriviaAnswer] = useState();
	const [hasSubmittedTrivia, setHasSubmittedTrivia] = useState(false);
	const [submittedTriviaAnswers, setSubmittedTriviaAnswers] = useState([]);

	// a state to store the current round in the game
	const [roundCount, setRoundCount] = useState(0);
	// a state that handles user earning in the buying state
	const [userEarnings, setUserEarnings] = useState(40);
	// a state to store all the user defense obtained from the database
	const [userDefenses, setUserDefenses] = useState([]);
	// state that holds the user selected defense in the buying phase
	const [selectedDefenses, setSelectedDefenses] = useState([]);
	const [boughtDefenses, setBoughtDefenses] = useState([]);


	//state that holds the attack rolled by the host
	const [rolledAttack, setRolledAttack] = useState("");
	//a state to hold scores for each team
	const [scores, setScores] = useState([]);

	const [defensesToSubmit, setDefensesToSubmit] = useState([]);
	const [bestDefenses, setBestDefenses] = useState([]);
	const [playedDefenses, setPlayedDefenses] = useState([]);
	const [hasSubmittedDefenses, setHasSubmittedDefenses] = useState(false);


	const [resetTimer, setResetTimer] = useState(false);

	// Context for Chat Box
	// All chat messages
	const [chatMessagesAll, setChatMessagesAll] = useState([]);
	// Team chat messages
	const [chatMessagesTeam, setChatMessagesTeam] = useState([]);
	const [hideTeamChat, setHideTeamChat] = useState(true);
	const [hideAllChat, setHideAllChat] = useState(true);

	//recalls all the socket events each time the socket changes to retrive the infromation from the server
	useEffect(() => {
		socket.on("new_student_joined_lobby", (info) => {
			setTeamInfo(info);
		});
		socket.on("host_moved_student", (info) => {
			setTeamInfo(info);
		});

		socket.on("host_started_game", (hasTriviaRound) => {
			if (hasTriviaRound) {
				setGameStage('TRIVIA');
			}
			else {
				setGameStage('BUY_DEFENSE');
			}
		});

		socket.on("host_ended_trivia_round", () => {
			setGameStage('BUY_DEFENSE');
		});

		socket.on("student_receives_trivia_question", (triviaQuestion) => {
			setTriviaQuestion(triviaQuestion);
			setSubmittedTriviaAnswers([]);
			setHasSubmittedTrivia(false);
		});

		socket.on("student_submitted_trivia_answer", (submittedTriviaAnswers) => {
			setSubmittedTriviaAnswers(submittedTriviaAnswers);
		});

		socket.on("student_receive_defenses", (defenses) => {
			//default to alphabetical
			defenses.sort((a, b) => {
				return (a.Name < b.Name) ? -1 : (a.Name > b.Name) ? 1 : 0
			})
			setUserDefenses(defenses);
		});

		socket.on("student_bought_defenses", (boughtDefenses) => {
			setBoughtDefenses(boughtDefenses);
		})

		socket.on("student_receive_attack", ({ attack, playedDefenses }) => {
			setResetTimer(true);
			setRoundCount(roundCount => roundCount + 1);
			setRolledAttack(attack);
			setGameStage("DEFEND_ATTACK");
			setHasSubmittedDefenses(false);
			setBestDefenses([]);
			setPlayedDefenses(playedDefenses);
		})

		socket.on("host_ended_game", () => {
			setGameStage("GAME_END");
		})

		socket.on("student_played_defenses", ({ scores, bestDefenses, playedDefenses }) => {
			setScores(scores);
			setBestDefenses(bestDefenses);
			setPlayedDefenses(playedDefenses);
		})

		socket.on("chat_receiveFromAll", ({ alias, message }) => {
			setChatMessagesAll(chatMessagesAll => [...chatMessagesAll, { alias, message }]);
		})

		socket.on("chat_receiveFromTeam", ({ alias, message }) => {
			setChatMessagesTeam(chatMessagesTeam => [...chatMessagesTeam, { alias, message }]);
		})

		socket.on("student_team_leader_changed", ({ alias }) => {
			setTeamLeader(alias);
		})

		return () => {
			socket.removeAllListeners();
		}
	}, []);

	useEffect(() => {
		if (nbOfTeams !== '') {
			setScores(Array(parseInt(nbOfTeams)).fill(0));
			setPlayedDefenses(Array(parseInt(nbOfTeams)).fill([]));
		}
	}, [nbOfTeams]);

	useEffect(() => {
		teamInfo.forEach((team, index) => {
			team.forEach((student) => {
				if (socket.id === student.socketId) {
					setMyTeamId(index);
				}
			});
		});
	}, [teamInfo]);

	useEffect(() => {
		//after changing team or changing round, it sets isTeamLeader to true or vice versa.
		if (teamInfo[myTeamId] && (gameStage !== "WAITING" && gameStage !== 'CONFIG')) {
			const avgTurn = Math.ceil(parseInt(nbOfRounds) / teamInfo[myTeamId].length);
			for (let i = 0; i < teamInfo[myTeamId].length; i++) {
				if (socket.id === teamInfo[myTeamId][i].socketId) {
					let myLeaderStartTurn = i * avgTurn;
					let myLeaderEndTurn = (i + 1) * avgTurn;

					if (roundCount === 0 && myLeaderStartTurn === 0) {
						setIsTeamLeader(true);
						socket.emit("student_team_leader_change", ({ lobbyId, alias, myTeamId }));
						break;
					}
					if (myLeaderStartTurn < roundCount && roundCount <= myLeaderEndTurn) {
						setIsTeamLeader(true);
						socket.emit("student_team_leader_change", ({ lobbyId, alias, myTeamId }));
						break;
					}
					else {
						setIsTeamLeader(false);
					}
				}
			}
		}
	}, [teamInfo, myTeamId, roundCount, gameStage]);

	//this is a workaround for the socket.on not reading real-time value bug
	useEffect(() => {
		if ((!isHost) && (gameStage === 'TRIVIA' || gameStage === 'BUY_DEFENSE')) {
			setHideTeamChat(false);
		}
		if (isHost && gameStage === 'BUY_DEFENSE') {
			socket.emit("host_start_buy_phase", lobbyId);
		}
	}, [gameStage]);

	useEffect(() => {
		boughtDefenses.forEach((defenses, index) => {
			if ((myTeamId === index) && (defenses.length > 0)) {
				setSelectedDefenses(defenses);
			}
		})
	}, [boughtDefenses]);

	//Start-------------Lobby Events------------Start//
	const host_create_lobby = () => {
		socket.emit(
			"host_create_lobby",
			{
				nbOfTeams,
				nbOfRounds,
				nbOfDefenses,
				timeForEachRound,
				userEarnings,
				hasTriviaRound,
				difficulty,
			},
			(lobbyId) => {
				setLobbyId(lobbyId);
			}
		);
		setHideAllChat(false);
	};

	const student_join_lobby = () => {
		console.log("Student joining lobby with lobbyId:", lobbyId, "and alias:", alias);
		if (lobbyId !== "" && alias !== "") {
			console.log("Lobby and alias present, joining lobby")
			socket.emit(
				"student_join_lobby",
				{ lobbyId, alias },
				({
					status,
					nbOfTeams,
					nbOfRounds,
					nbOfDefenses,
					timeForEachRound,
					userEarnings,
					hasTriviaRound,
					difficulty,
					teamInfo,
				}) => {
					if (status === "SUCCESS") {
						setNbOfTeams(nbOfTeams);
						setNbOfRounds(nbOfRounds);
						setNbOfDefenses(nbOfDefenses);
						setTimeForEachRound(timeForEachRound);
						setUserEarnings(parseInt(userEarnings));
						setHasTriviaRound(hasTriviaRound);
						setDifficulty(difficulty);
						setTeamInfo(teamInfo);

						setIsInLobby(true);
						setGameStage('WAITING');
					} else if (status === "NOT_EXIST") {
						alert("Lobby does not exist. Please make sure you enter the correct lobby code given by your host.");
						setIsInLobby(false);
					}
					else if (status === "ALREADY_STARTED") {
						alert("Unable to join this lobby because it has already started its game session.");
						setIsInLobby(false);
					}
				}
			);
			setHideAllChat(false);
		} else {
			console.log("Lobby and alias not present, aborting")
		}

	};

	const host_start_game = () => {
		socket.emit("host_start_game", lobbyId);
	}

	const host_move_student = (lobbyId, socketId, oldTeamId, newTeamId) => {
		socket.emit("host_move_student", {
			lobbyId,
			socketId,
			oldTeamId,
			newTeamId,
		});
	};
	//End-------------Lobby Events------------End//

	//Start-------------Trivia Events------------Start//
	const host_gets_trivia_question = () => {
		socket.emit("host_gets_trivia_question", lobbyId, (newTriviaQuestion) => {
			setTriviaQuestion(newTriviaQuestion);
		});
	};

	const student_submit_trivia_answer = () => {
		socket.emit(
			"student_submit_trivia_answer",
			{ lobbyId, teamId: myTeamId, triviaAnswer },
			({ triviaReward }) => {
				setUserEarnings(userEarnings => userEarnings + triviaReward);
			}
		);
	};

	const host_ends_trivia_round = () => {
		socket.emit("host_ends_trivia_round", lobbyId);
	};
	//End-------------Trivia Events------------End//

	const student_buy_defenses = () => {
		console.log("Before sending defenses in, selected defenses are: ", selectedDefenses);
		socket.emit("student_buy_defenses", ({ lobbyId, teamId: myTeamId, defenses: selectedDefenses }));
	}

	const host_start_next_defense_round = () => {
		socket.emit("host_start_next_defense_round", lobbyId);
	}

	const host_end_game = () => {
		socket.emit("host_end_game", lobbyId);
	}

	const student_play_defenses = () => {
		socket.emit("student_play_defenses", { lobbyId: lobbyId, teamId: myTeamId, defenses: defensesToSubmit, attackId: rolledAttack.AttackID });
	}

	const chat_sendToAll = (message) => {
		// Do not allow all chat messages to be send if it is empty
		if(message.length > 0) {
			socket.emit("chat_sendToAll", ({ lobbyId, alias, message }));
		}
	}

	const chat_sendToTeam = (message) => {
		// Do not allow team chat messages to be send if it is empty
		if(message.length > 0) {
			socket.emit("chat_sendToTeam", ({ lobbyId, alias, teamId: myTeamId, message }))
		}
	}

	// providing access to these value to all the interfaces
	return (
		<Context.Provider
			value={{
				gameStage, setGameStage,

				//lobby configuration
				isHost, setIsHost,
				isInLobby, setIsInLobby,
				alias, setAlias,
				lobbyId, setLobbyId,
				nbOfTeams, setNbOfTeams,
				nbOfRounds, setNbOfRounds,
				timeForEachRound, setTimeForEachRound,
				userEarnings, setUserEarnings,
				hasTriviaRound, setHasTriviaRound,
				difficulty, setDifficulty,
				nbOfDefenses, setNbOfDefenses,

				//lobby waiting page
				teamInfo, setTeamInfo,
				roundCount, setRoundCount,
				myTeamId, setMyTeamId,
				isTeamLeader, setIsTeamLeader,
				teamLeader, setTeamLeader,

				//trivia page
				triviaQuestion, setTriviaQuestion,
				triviaAnswer, setTriviaAnswer,
				hasSubmittedTrivia, setHasSubmittedTrivia,
				submittedTriviaAnswers, setSubmittedTriviaAnswers,

				//buy defenses
				userDefenses, setUserDefenses,
				selectedDefenses, setSelectedDefenses,
				boughtDefenses, setBoughtDefenses,

				//actual gameplay
				rolledAttack, setRolledAttack,
				scores, setScores,
				defensesToSubmit, setDefensesToSubmit,
				bestDefenses, setBestDefenses,
				playedDefenses, setPlayedDefenses,
				hasSubmittedDefenses, setHasSubmittedDefenses,
				resetTimer, setResetTimer,

				chatMessagesTeam, setChatMessagesTeam,
				chatMessagesAll, setChatMessagesAll,
				hideTeamChat, setHideTeamChat,
				hideAllChat, setHideAllChat,

				//socket events
				host_create_lobby, student_join_lobby, host_move_student,
				host_start_game,
				host_gets_trivia_question, student_submit_trivia_answer, host_ends_trivia_round,
				student_buy_defenses,
				host_start_next_defense_round, host_end_game,
				student_play_defenses,
				chat_sendToAll, chat_sendToTeam
			}}
		>
			{children}
		</Context.Provider>
	);
};
export default ThemeContextProvider;
