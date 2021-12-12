import * as React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useState, useContext } from "react";
import { Context } from "../../context/ContextProvider";
import ShuffleTeam from "../ShuffleTeam/ShuffleTeam";
import HostConfiguration from "../HostConfiguration/HostConfiguration";
import GameScore from "../GameScore/GameScore";
import TriviaInterface from "../TriviaInterface/TriviaInterface";

const HostInterface = ({ }) => {
	const {
		lobbyId,
		hasTriviaRound,
		gameStage,
		host_start_game,
	} = useContext(Context);

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

	const handleStartGame = () => {
		host_start_game();
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

	if (gameStage === 'TRIVIA'){
		return(
			<TriviaInterface isHost={true} isTeamLeader={false} />
		)
	}

	if (gameStage === 'BUY_DEFENSE'){
		return(
			<Typography>Palceholder</Typography>
		)
	}

};
export default HostInterface;
