import * as React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useState, useContext } from "react";
import { Context } from "../../context/ContextProvider";
import ShuffleTeam from "../ShuffleTeam/ShuffleTeam";
import HostConfiguration from "../HostConfiguration/HostConfiguration";
import GameScore from "../GameScore/GameScore";
import TriviaInterface from "../TriviaInterface/TriviaInterface";
import BoughtDefensesBoard from "../BoughtDefensesBoard";

const HostInterface = ({ }) => {
	const {
		lobbyId,
		hasTriviaRound,
		gameStage,
		host_start_game,
		boughtDefenses,
	} = useContext(Context);

	const [allDoneBuyingDefenses, setAllDoneBuyingDefenses] = useState(false);

	const boxStyling = {
		m: "20px",
		p: "10px",
	};
	// function to check the total number of attacks played
	// const rollPhase = () => {
	// 	//checks to see if the game has come to an end
	// 	if (roundCount !== nbOfRounds) {
	// 		roll(lobbyId);
	// 		getLead();
	// 		setRoundCount(roundCount + 1);
	// 	} else {
	// 		setEndGame(true);
	// 	}
	// };

	React.useEffect(() => {
		let aTeamIsNotDone = true;
		
		console.log(boughtDefenses);
		boughtDefenses.forEach(team => {
			if (team.length === 0) {
				aTeamIsNotDone = false;
			}
		});
		if(boughtDefenses.length === 0){
			aTeamIsNotDone = false;
		}
		setAllDoneBuyingDefenses(aTeamIsNotDone);
	}, [boughtDefenses]);

	const handleStartGame = () => {
		host_start_game();
	}

	const handleStartActualGame = () => {
		//TODO
	}

	if (gameStage === 'CONFIG') {
		return (
			<HostConfiguration />
		)
	}

	if (gameStage === 'WAITING') {
		return (
			<Box sx={boxStyling}>
				<Typography
					align="center"
					variant="h6"
				>{`Lobby created, use code ${lobbyId} to join.`}</Typography>

				<ShuffleTeam />
				<Box sx={boxStyling}>
					<br></br>
					<br></br>
					{hasTriviaRound
						?
						<Button variant="contained" onClick={handleStartGame}>
							Start Game (Trivia Round)
						</Button>
						:
						<Button variant="contained" onClick={handleStartGame}>
							Start Game (Buy Defense Phase)
						</Button>
					}
				</Box>
			</Box>
		);
	}

	if (gameStage === 'TRIVIA') {
		return (
			<TriviaInterface isHost={true} isTeamLeader={false} />
		)
	}

	if (gameStage === 'BUY_DEFENSE') {
		return (
			<Box>
				{allDoneBuyingDefenses
					?
					<Box>
						<Typography align="center" variant="h6">Teams have finished buying defenses.</Typography>
						<Typography align="center" variant="h6">You can start whenever you see fit.</Typography>
					</Box>
					:
					<Box>
						<Typography align="center" variant="h6">Students are buying defenses...</Typography>
						<Typography align="center" variant="h6">Meanwhile, you can view each team's purchased defenses once a team finishes their purchase.</Typography>
					</Box>
				}
				<Box textAlign='center'>
					<Button variant="contained" align="center" disabled={!allDoneBuyingDefenses} onClick={() => handleStartActualGame()}>
						Start Game
					</Button>
				</Box>

				<BoughtDefensesBoard />
			</Box>
		)
	}

};
export default HostInterface;
