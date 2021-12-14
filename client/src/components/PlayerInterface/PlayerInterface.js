import * as React from "react";
import { useContext, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { Context } from "../../context/ContextProvider";
import GameInterface from "../GameInterface/GameInterface";
import BuyingInterface from "../BuyingInterface/BuyingInterface";
import PlayerInformation from "../PlayerInformation/PlayerInformation";
import TriviaInterface from "../TriviaInterface/TriviaInterface";
import BoughtDefensesBoard from "../BoughtDefensesBoard";
import GameScore from "../GameScore";
import DefenseBoard from "../DefenseBoard/DefenseBoard";

// tha main player interface that handles the the change of pages for the players
const PlayerInterface = ({ }) => {
	// shared states
	const {
		gameStage,
		isTeamLeader,
		playedDefenses, myTeamId
	} = useContext(Context);

	if (gameStage === 'WAITING') {
		return (
			<Box>
				<Typography
					align="center"
					variant="h6"
				>{`Waiting for host to start game...`}</Typography>

				<PlayerInformation />
			</Box>
		)
	}

	if (gameStage === 'TRIVIA') {
		return (
			<TriviaInterface isHost={false} isTeamLeader={isTeamLeader} />
		)
	}

	if (gameStage === 'BUY_DEFENSE') {
		return (
			<BuyingInterface />
		)
	}

	if (gameStage === 'DONE_BUYING') {
		return (
			<Box>
				<Typography align="center" variant="h6">Waiting for the host to start game...</Typography>
				<Typography align="center" variant="h6">Meanwhile, you can view each team's purchased defenses.</Typography>
				<BoughtDefensesBoard />
			</Box>
		)
	}

	if (gameStage === 'DEFEND_ATTACK') {
		return (
			<Box>
				<GameInterface isHost={false} />
				{(playedDefenses[myTeamId].length !== 0) && <DefenseBoard />}
			</Box>
		)
	}

	if (gameStage === 'GAME_END') {
		return (
			<Box>
				<Typography align="center" variant="h6">This game session is over.</Typography>
				<GameScore />
			</Box>
		)
	}

};
export default PlayerInterface;
