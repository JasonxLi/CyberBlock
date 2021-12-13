import * as React from "react";
import { useContext, useState } from "react";
import { Box, Typography } from "@material-ui/core";
import { Context } from "../../context/ContextProvider";
import GameInterface from "../GameInterface/GameInterface";
import BuyingInterface from "../BuyingInterface/BuyingInterface";
import PlayerInformation from "../PlayerInformation/PlayerInformation";
import TriviaInterface from "../TriviaInterface/TriviaInterface";

// tha main player interface that handles the the change of pages for the players
const PlayerInterface = ({ }) => {
	// shared states
	const {
		gameStage,
		isTeamLeader
	} = useContext(Context);

	//local state to get the team number for teamleader
	const [teamNumber, setTeamNumber] = useState();

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
			<Box>
				<Typography>Palceholder</Typography>
				<BuyingInterface />
			</Box>
		)
	}

	// return (
	// 	<Box>
	// 		{!inBuyingPhase ? (
	// 			<PlayerInformation />
	// 		) : inBuyingPhase && !endBuyPhase ? (
	// 			<BuyingInterface
	// 				userDefenses={userDefenses}
	// 				setTeamNumber={setTeamNumber}
	// 				teamNumber={teamNumber}
	// 			/>
	// 		) : (
	// 			rolledAttack !== "" && (
	// 				<GameInterface
	// 					rolledAttack={rolledAttack}
	// 					attackId={rolledAttack.AttackID}
	// 					pointTable={pointTable}
	// 					teamNumber={teamNumber}
	// 				/>
	// 			)
	// 		)}
	// 	</Box>
	// );
};
export default PlayerInterface;
