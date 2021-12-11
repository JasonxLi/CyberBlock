import React, { createContext, useState, useEffect, useContext } from "react";

import io from "socket.io-client";
//establishes a socket io connection to the server
const socket = io.connect("http://localhost:3001");

export const Context = createContext({});

const ThemeContextProvider = ({ children }) => {
	// state that holds the user selected defense in the buying phase
	const [selectedDefenses, setSelectedDefenses] = useState([]);
	// a stae to end the buying phase and move to the next interface
	const [endBuyPhase, setEndBuyPhase] = useState(false);
	// a state that handles user earning in the buying state
	const [userEarnings, setUserEarnings] = useState(30);
	//state that hold the lobbyId created by the host
	const [lobbyId, setLobbyId] = useState("");
	//state that holds the attack rolled by the host
	const [rolledAttack, setRolledAttack] = useState("");
	//a state that holds the alias of each player that joined
	const [alias, setAlias] = useState("");
	// a state to see if users are in the set lobby or not
	const [isInLobby, setIsInLobby] = useState(false);
	// a state that decides whether a player is host or student ans puts them in a correct interface
	const [isHost, setIsHost] = useState(false);
	//a state to change the interface to buying interface
	const [inBuyingPhase, setBuyingPhase] = useState(false);
	// a state to store all the user defense obtained from the database
	const [userDefenses, setUserDefenses] = useState([]);

	const [nbOfTeams, setNbOfTeams] = useState(2);
	const [nbOfDefenses, setNbOfDefenses] = useState(2);
	const [timeForEachRound, setTimeForEachRound] = useState(120);
	const [hasTriviaRound, setHasTriviaRound] = useState(false);
	const [difficulty, setDifficulty] = useState(1);

	//a state to store the number of rounds configured by the host
	const [nbOfRounds, setNbOfRounds] = useState(5);
	// a state to store all team information once student joins and host moves the players
	const [teamInfo, setTeamInfo] = useState([]);
	// a state to store all the current Leader from each team
	const [currentLead, setCurrentLead] = useState([]);
	// a state to store the current round in the game
	const [roundCount, setRoundCount] = useState(0);
	// a state to change the interface to displayer all the team info to students
	const [showPlayerPhase, setShowPlayerPhase] = useState(false);
	//a state to hold trivia questions
	const [triviaQuestion, setTriviaQuestion] = useState();

	const [triviaAnswer, setTriviaAnswer] = useState();
	//a state to hold the selected trivia answers
	const [submittedTriviaAnswer, setSubmittedTriviaAnswer] = useState(false);
	//a state to hold the correct trivia answers
	const [correctTriviaAnswer, setCorrectTriviaAnswer] = useState();
	//a state to hold points for each team

	//state to store current leader index

	const [tempinfo, settempinfo] = useState();

	var playerIndex = 0;
	//recalls all the socket events each time the socket changes to retrive the infromation from the server
	useEffect(() => {
		socket.on("new_student_joined_lobby", (info) => {
			setTeamInfo(info);
		});
		socket.on("host_moved_student", (info) => {
			setTeamInfo(info);
		});

		socket.on("host_ended_trivia_round", () => {
			setBuyingPhase(true);
		});

		socket.on("student_receives_trivia_question", (triviaQuestion) => {
			setTriviaQuestion(triviaQuestion);
			setSubmittedTriviaAnswer(false);
		});

		socket.on("receive_roll", (attack) => {
			setRolledAttack(attack);
		});
		socket.on("receive_defense_cards", (defenses) => {
			setUserDefenses(defenses);
			setBuyingPhase(true);
		});
	}, [socket]);

	//Start-------------Lobby Events------------Start//
	const host_create_lobby = (
		nbOfTeams,
		nbOfRounds,
		nbOfDefenses,
		timeForEachRound,
		hasTriviaRound,
		difficulty
	) => {
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
				setIsHost(true);
				setIsInLobby(true);
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
					teamsInfo,
				}) => {
					setNbOfTeams(nbOfTeams);
					setNbOfRounds(nbOfRounds);
					setNbOfDefenses(nbOfDefenses);
					setTimeForEachRound(timeForEachRound);
					setHasTriviaRound(hasTriviaRound);
					setDifficulty(difficulty);
					settempinfo(teamsInfo);

					setIsInLobby(true);
					setShowPlayerPhase(true);
				}
			);
		}
	};
	const initailArray = new Array(nbOfTeams).fill(0);
	const [leaderPlayerIndex, setLeaderPlayerIndex] = useState(initailArray);
	const [points, setPoints] = useState(initailArray);

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
			{ lobbyId, triviaAnswer },
			({ triviaReward, correctAnswer }) => {
				setUserEarnings(userEarnings + triviaReward);
				setCorrectTriviaAnswer(correctAnswer);
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

	// function to get all the teamleaders from the team
	const getLead = () => {
		//shallow copy
		const copyOfLdrPlyIndex = [...leaderPlayerIndex];

		const tempLeader = [...currentLead];

		teamInfo.map((team, index) => {
			//switching the lead depending on the size of the team
			const leadSwitch = nbOfRounds / team.length;

			console.log("round", roundCount);

			//when the round count hits the leader nedds to be switched
			if (roundCount % Math.ceil(leadSwitch) === 0) {
				//making a placeholder for the leader's socket
				let tempLeaderIndex = tempLeader[index];
				// keeping track of the player index as no teams might have the same no of players
				var tempdata = copyOfLdrPlyIndex[index];
				// grabbing the socket id of the leader
				tempLeaderIndex = team[tempdata].socketId;
				console.log(tempLeaderIndex);
				// storing the lleader's socket in the place holder
				tempLeader[index] = tempLeaderIndex;
				console.log(tempLeader);
				// setting the updated array
				setCurrentLead(tempLeader);
				//increasing the player index value
				copyOfLdrPlyIndex[index] = copyOfLdrPlyIndex[index] + 1;

				console.log(copyOfLdrPlyIndex);
				setLeaderPlayerIndex(copyOfLdrPlyIndex);
			}
		});
	};

	// providing access to these value to all the interfaces
	return (
		<Context.Provider
			value={{
				selectedDefenses,
				setSelectedDefenses,
				endBuyPhase,
				setEndBuyPhase,
				userEarnings,
				setUserEarnings,
				lobbyId,
				setLobbyId,
				roll,
				start_buy_phase,
				rolledAttack,
				setRolledAttack,
				isInLobby,
				setIsInLobby,
				isHost,
				setIsHost,
				inBuyingPhase,
				userDefenses,
				host_create_lobby,
				student_join_lobby,
				nbOfRounds,
				setNbOfRounds,
				host_create_lobby,
				setAlias,
				alias,
				teamInfo,
				setTeamInfo,
				host_move_student,
				currentLead,
				setCurrentLead,
				roundCount,
				setRoundCount,
				getLead,
				showPlayerPhase,
				setShowPlayerPhase,
				host_gets_trivia_question,
				host_ends_trivia_round,
				triviaQuestion,
				triviaAnswer,
				setTriviaAnswer,
				student_submit_trivia_answer,
				submittedTriviaAnswer,
				setSubmittedTriviaAnswer,
				correctTriviaAnswer,
				setCorrectTriviaAnswer,
				points,
				setPoints,
				receive_points_per_round,
			}}
		>
			{children}
		</Context.Provider>
	);
};
export default ThemeContextProvider;
