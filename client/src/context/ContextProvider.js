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

	//a state to hold trivia questions
	const [triviaQuestion, setTriviaQuestion] = useState();
	const [triviaAnswer, setTriviaAnswer] = useState();
	const [hasSubmittedTrivia, setHasSubmittedTrivia] = useState(false);
	const [submittedTriviaAnswers, setSubmittedTriviaAnswers] = useState([]);

	// a state to store the current round in the game
	const [roundCount, setRoundCount] = useState(0);


	const initialArray = new Array(nbOfTeams).fill(0);
	const [leaderPlayerIndex, setLeaderPlayerIndex] = useState(initialArray);
	// a state to store all the current Leader from each team
	const [currentLead, setCurrentLead] = useState([]);
	// state that holds the user selected defense in the buying phase
	const [selectedDefenses, setSelectedDefenses] = useState([]);
	// a stae to end the buying phase and move to the next interface
	const [endBuyPhase, setEndBuyPhase] = useState(false);
	// a state that handles user earning in the buying state
	const [userEarnings, setUserEarnings] = useState(30);
	//state that holds the attack rolled by the host
	const [rolledAttack, setRolledAttack] = useState("");
	//a state to change the interface to buying interface
	const [inBuyingPhase, setBuyingPhase] = useState(false);
	// a state to store all the user defense obtained from the database
	const [userDefenses, setUserDefenses] = useState([]);
	//a state to hold points for each team
	const [points, setPoints] = useState(initialArray);


	//recalls all the socket events each time the socket changes to retrive the infromation from the server
	useEffect(() => {
		socket.on("new_student_joined_lobby", (info) => {
			setTeamInfo(info);
		});
		socket.on("host_moved_student", (info) => {
			setTeamInfo(info);
		});

		socket.on("host_started_game", () => {
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
		})

		socket.on("receive_roll", (attack) => {
			setRolledAttack(attack);
		});
		socket.on("receive_defense_cards", (defenses) => {
			setUserDefenses(defenses);
			setBuyingPhase(true);
		});
	}, [socket]);

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
		if (teamInfo[myTeamId]) {
			const avgTurn = Math.floor(nbOfRounds / teamInfo[myTeamId].length);
			teamInfo[myTeamId].every((student, index) => {
				if (socket.id === student.socketId) {
					let myLeaderEndTurn = (index + 1) * avgTurn;
					if (roundCount <= myLeaderEndTurn) {
						setIsTeamLeader(true);
						return (false); //equivalent to a break in every()
					}
					else {
						setIsTeamLeader(false);
					}
				}
			})
		}
	}, [myTeamId, roundCount]);

	// useEffect(() => {
	// 	console.log('submittedTriviaAnswers:', submittedTriviaAnswers);
	// }, [submittedTriviaAnswers]);


	//Start-------------Lobby Events------------Start//
	const host_create_lobby = () => {
		socket.emit(
			"host_create_lobby",
			{
				nbOfTeams,
				nbOfRounds,
				nbOfDefenses,
				timeForEachRound,
				hasTriviaRound,
				difficulty,
			},
			(lobbyId) => {
				setLobbyId(lobbyId);
			}
		);
	};

	const student_join_lobby = () => {
		if (lobbyId !== "" && alias !== "") {
			socket.emit(
				"student_join_lobby",
				{ lobbyId, alias },
				({
					nbOfTeams,
					nbOfRounds,
					nbOfDefenses,
					timeForEachRound,
					hasTriviaRound,
					difficulty,
					teamInfo,
				}) => {
					setNbOfTeams(nbOfTeams);
					setNbOfRounds(nbOfRounds);
					setNbOfDefenses(nbOfDefenses);
					setTimeForEachRound(timeForEachRound);
					setHasTriviaRound(hasTriviaRound);
					setDifficulty(difficulty);
					setTeamInfo(teamInfo);
				}
			);
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
			{ lobbyId, teamId:myTeamId, triviaAnswer },
			({ triviaReward }) => {
				setUserEarnings(userEarnings + triviaReward);
			}
		);
	};

	const host_ends_trivia_round = () => {
		socket.emit("host_ends_trivia_round", lobbyId);
	};
	//End-------------Trivia Events------------End//

	const roll = (lobbyId) => {
		socket.emit("roll", lobbyId);
	};

	const start_buy_phase = () => {
		socket.emit("start_buy_phase", lobbyId);
	};

	// event sent to server to see the correct answer  and get points from the server

	const receive_points_per_round = (
		lobbyId,
		defenseID,
		attackID,
		teamNumber
	) => {
		socket.emit(
			"receive_points_per_round",
			{
				lobbyId,
				defenseID,
				attackID,
				teamNumber,
			},
			({ rewardPoint, teamIndex }) => {
				if (rewardPoint !== "" && teamIndex !== "") {
					const currentpointIndex = [...points];
					let tempPointIndex = currentpointIndex[teamIndex - 1];
					tempPointIndex = tempPointIndex + rewardPoint;
					currentpointIndex[teamIndex - 1] = tempPointIndex;
					setPoints(currentpointIndex);
				}
			}
		);
	};

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
				hasTriviaRound, setHasTriviaRound,
				difficulty, setDifficulty,

				//lobby waiting page
				teamInfo, setTeamInfo,
				myTeamId, setMyTeamId,
				isTeamLeader, setIsTeamLeader,

				//trivia page
				triviaQuestion, setTriviaQuestion,
				triviaAnswer, setTriviaAnswer,
				hasSubmittedTrivia, setHasSubmittedTrivia,
				submittedTriviaAnswers, setSubmittedTriviaAnswers,

				//socket events
				host_create_lobby, student_join_lobby, host_move_student,
				host_start_game,
				host_gets_trivia_question, student_submit_trivia_answer, host_ends_trivia_round
			}}
		>
			{children}
		</Context.Provider>
	);
};
export default ThemeContextProvider;
