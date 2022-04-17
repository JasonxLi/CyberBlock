import * as React from "react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	Button,
	ButtonGroup,
	Grid,
	Tooltip,
} from "@material-ui/core";
import { Context } from "../../context/ContextProvider";
import { useState, useContext } from "react";
import GameScore from "../GameScore/GameScore";
import Timer from "../Timer/Timer"
import { styled } from '@material-ui/core/styles';

const ToBeStyledTooltip = ({ className, ...props }) => (
    <Tooltip {...props} classes={{ tooltip: className }} />
  );
  // Change the style of the tooltip
  const StyledTooltip = styled(ToBeStyledTooltip)(({ theme }) => ({
    fontSize: '15px',
    backgroundColor: '#F5F5F5',
    color: 'rgba(0, 0, 0, 15)',
    border: '2px solid #dadde9',
  }));

// this page displays the actual game play witht the attack rolled by the host ad user selected defense as buttons
const GameInterface = ({ isHost }) => {
	//importing shared states
	const {
		roundCount, nbOfRounds, timeForEachRound,
		resetTimer, setResetTimer,
		rolledAttack,
		selectedDefenses,
		defensesToSubmit, setDefensesToSubmit,
		hasSubmittedDefenses, setHasSubmittedDefenses,
		isTeamLeader,
		host_start_next_defense_round, host_end_game,
		student_play_defenses,
	} = useContext(Context);

	const [count, setCount] = useState(0);

	const boxStyling = {
		m: "20px",
		p: "10px",
	};

	//handles the user submitted defenses
	const handleChange = (defenseID, defenseName) => {
		//avoids repetition

		//this statement prohibits the user from submitting more than 2 defenses against the attack
		if (count < 2) {
			setCount(count + 1);
			//adds the selected defense to selectedItem list
			const tempDefense = {
				defenseName: defenseName,
				defenseID: defenseID,
			};
			setDefensesToSubmit([...defensesToSubmit, tempDefense]);
		}
		// this function allows the user to delete first defense from the selected item list and add the new defense to the selected item list
		else {
			const tempDefense = {
				defenseName: defenseName,
				defenseID: defenseID,
			};
			setDefensesToSubmit([...defensesToSubmit.slice(1), tempDefense]);
		}
	};

	const handleEndGame = () => {
		host_end_game();
	}

	const handleNextRound = () => {
		setResetTimer(true);
		host_start_next_defense_round();
	}

	const handleSubmitDefenses = () => {
		setHasSubmittedDefenses(true);
		student_play_defenses();
	}

	return (
		<Box sx={boxStyling}>
			<Timer initialSeconds={timeForEachRound} resetTimer={resetTimer} setResetTimer={setResetTimer} />
			<Grid container justifyContent="flex-end">
				<Typography>{`Current round: ${roundCount}/${nbOfRounds}`}</Typography>
			</Grid>

			<GameScore />
			<Box sx={{ m: "30px" }}>
				<Card>
					<CardContent>
						<StyledTooltip title={rolledAttack.Description}>
							<Typography
								align="center"
								variant="h6"
								color="text.secondary"
								gutterBottom
							>
								{`Attack rolled: ${rolledAttack.Name} `}
							</Typography>
						</StyledTooltip>
					</CardContent>
				</Card>
			</Box>

			{isHost
				?
				<Box align='center'>
					<ButtonGroup variant="text" aria-label="text button group">
						<Button align='center' variant="contained" onClick={() => { handleEndGame() }}>End Game</Button>
						{(roundCount < nbOfRounds) &&
							<Button variant="contained" onClick={() => { handleNextRound() }}>Next Round</Button>
						}
					</ButtonGroup>
				</Box>

				:

				<Box>
					<Grid container spacing={8}>
						{selectedDefenses.map((item) => {
							return (
								<Grid item>
									<Button
										variant="contained"
										size="large"
										color="blue"
										onClick={() => handleChange(item.defenseID, item.defenseName)}
									>
										<Typography
											variant="h7"
											align="center"
											color="text.secondary"
											gutterBottom
										>
											{item.defenseName}
										</Typography>
									</Button>
								</Grid>
							);
						})}
					</Grid>
					<Box sx={boxStyling}>
						<Box sx={{ m: "10px" }}>
							<Typography>Selected Defense: </Typography>
						</Box>
						<Card>
							<Box sx={{ m: "10px" }}>
								{defensesToSubmit.map((item) => {
									return <Typography>{item.defenseName}</Typography>;
								})}
							</Box>
						</Card>
					</Box>
					<br></br>
					<br></br>
					{isTeamLeader ?
						<Box>
							<Typography>You are the current team leader, discuss with your team before submitting your defenses.</Typography>
						</Box>
						:
						<Typography>You are not the current team leader, discuss with your team to help your team leader pick appropriate defenses.</Typography>
					}
					<Button disabled={!isTeamLeader || hasSubmittedDefenses} variant="contained" onClick={() => handleSubmitDefenses()}>
						Submit
					</Button>
				</Box>
			}

		</Box>
	);
};
export default GameInterface;
