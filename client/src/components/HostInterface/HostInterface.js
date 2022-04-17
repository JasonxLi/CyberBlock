import * as React from "react";
import { Box, Button, Typography } from "@material-ui/core";
import { useState, useContext } from "react";
import { Context } from "../../context/ContextProvider";
import ShuffleTeam from "../ShuffleTeam/ShuffleTeam";
import HostConfiguration from "../HostConfiguration/HostConfiguration";
import GameScore from "../GameScore/GameScore";
import TriviaInterface from "../TriviaInterface/TriviaInterface";
import BoughtDefensesBoard from "../BoughtDefensesBoard";
import GameInterface from "../GameInterface/GameInterface";
import DefenseBoard from "../DefenseBoard/DefenseBoard";

const HostInterface = ({ }) => {
	const {
		lobbyId,
		hasTriviaRound,
		gameStage,
		host_start_game,
		boughtDefenses,
		host_start_next_defense_round,
		host_gets_trivia_question
	} = useContext(Context);

	const [allDoneBuyingDefenses, setAllDoneBuyingDefenses] = useState(false);

	const boxStyling = {
		m: "20px",
		p: "10px",
	};

	//useEffect to decide if all teams have finished buying attacks
	React.useEffect(() => {
		let aTeamIsNotDone = true;

		boughtDefenses.forEach(team => {
			if (team.length === 0) {
				aTeamIsNotDone = false;
			}
		});
		if (boughtDefenses.length === 0) {
			aTeamIsNotDone = false;
		}
		setAllDoneBuyingDefenses(aTeamIsNotDone);
	}, [boughtDefenses]);

	const handleStartTrivia = () => {
		host_start_game();
	}

	const handleStartBuying = () => {
		host_start_game();
	}

	const handleStartDefendAttack = () => {
		host_start_next_defense_round();
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
						<Button variant="contained" onClick={handleStartTrivia}>
							Start Game (Trivia Round)
						</Button>
						:
						<Button variant="contained" onClick={handleStartBuying}>
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
					<Button variant="contained" align="center" onClick={() => handleStartDefendAttack()}>
						Start Game
					</Button>
				</Box>

				<BoughtDefensesBoard />
			</Box>
		)
	}

	if (gameStage === 'DEFEND_ATTACK') {
		return (
			<Box>
				<GameInterface isHost={true} />
				<DefenseBoard />
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
export default HostInterface;
