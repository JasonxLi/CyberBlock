import * as React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useState, useContext } from "react";
import { Context } from "../../context/ContextProvider";
import ShuffleTeam from "../ShuffleTeam/ShuffleTeam";
import HostConfiguration from "../HostConfiguration/HostConfiguration";
import GameScore from "../GameScore/GameScore";

const HostInterface = ({}) => {
	const {
		lobbyId,
		roll,
		start_buy_phase,
		rolledAttack,
		nbOfRounds,
		roundCount,
		setRoundCount,
		getLead,
		currentLead,
	} = useContext(Context);
	//temporary dummy state to set the end game event
	const [endGame, setEndGame] = useState(false);

	//a state to change to the second interface
	const [endConfigurationPhase, setEndConfigurationPhase] = useState(false);
	const [endShufflePhase, setEndShufflePhase] = useState(false);
	const boxStyling = {
		m: "20px",
		p: "10px",
	};
	// function to check the total number of attacks played
	const rollPhase = () => {
		//checks to see if the game has come to an end
		if (roundCount !== nbOfRounds) {
			roll(lobbyId);
			getLead();
			setRoundCount(roundCount + 1);
		} else {
			setEndGame(true);
		}
	};

	// function to trigger the buying event and obtain the point table
	const buyPhase = () => {
		start_buy_phase(lobbyId);
		setEndShufflePhase(true);
	};

	return (
		<Box>
			{endConfigurationPhase ? (
				<Box sx={boxStyling}>
					<Typography
						align="center"
						variant="h6"
					>{`Lobby created, use code ${lobbyId} to join.`}</Typography>

					<ShuffleTeam/>
					{/* <Box sx={boxStyling}>
						<br></br>
						<br></br>
						<Button variant="contained" onClick={buyPhase}>
							Start BuyPhase
						</Button>
						<br></br>
						<br></br>
						<Button variant="contained" onClick={rollPhase}>
							Roll Attack
						</Button>
					</Box>
					<br></br>
					<br></br>
					{rolledAttack !== "" && (
						<Typography>{`You rolled ${rolledAttack.Name}`}</Typography>
					)}
					<br></br>
					<br></br>
					{endShufflePhase ? <GameScore /> : <ShuffleTeam />} */}
				</Box>
			) : (
				<HostConfiguration
					setEndConfigurationPhase={setEndConfigurationPhase}
				/>
			)}
		</Box>
	);
};
export default HostInterface;
