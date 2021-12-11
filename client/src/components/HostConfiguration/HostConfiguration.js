import * as React from "react";
import {
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Input,
} from "@material-ui/core";
import { useState, useContext } from "react";
import { Context } from "../../context/ContextProvider";

// page to allow the host to add configurations to the game
const HostConfiguration = ({ children, setEndConfigurationPhase }) => {
	// shared states
	const { setNbOfRounds, host_create_lobby, nbOfRounds } = useContext(Context);

	//local states sets the difficulty of the game
	const [difficulty, setDifficulty] = useState(1);
	//local state set the time for each round
	const [timeForEachRound, setTimeForEachRound] = useState(0);
	//sets whether or not the host wants trivia game
	const [hasTriviaRound, setHasTriviaRound] = useState(false);
	//state to selects the numbe rof teams that the host wants
	const [nbOfTeams, setNbOfTeams] = useState(2);
	//state to set number correct defense that the game should show after each round
	const [nbOfDefenses, setNbOfDefenses] = useState(2);

	const formControlBox = {
		m: "20px",
		p: "10px",
		maxWidth: 140,
	};
	// handles the submission of the configuration by calling the create lobby event
	const handleOnClick = () => {
		//changes to the next interface
		setEndConfigurationPhase(true);
		host_create_lobby(
			nbOfTeams,
			nbOfRounds,
			nbOfDefenses,
			timeForEachRound,
			hasTriviaRound,
			difficulty
		);
	};

	return (
		<Box sx={formControlBox}>
			<FormControl fullWidth>
				<InputLabel id="select-label-round">Round</InputLabel>
				<Select
					label="Round"
					onChange={(event) => setNbOfRounds(event.target.value)}
				>
					<MenuItem value={5}>5</MenuItem>
					<MenuItem value={8}>8</MenuItem>
					<MenuItem value={10}>10</MenuItem>
				</Select>
			</FormControl>

			<FormControl fullWidth>
				<InputLabel id="select-label-difficulty">Difficulty</InputLabel>
				<Select
					label="Difficulty"
					onChange={(event) => setDifficulty(event.target.value)}
				>
					<MenuItem value={1}>Beginner</MenuItem>
					<MenuItem value={2}>Intermediate</MenuItem>
					<MenuItem value={3}>Expert</MenuItem>
				</Select>
			</FormControl>

			<FormControl fullWidth>
				<InputLabel id="select-label-timeForEachRound">
					Time per Round
				</InputLabel>
				<Select
					label="timeForEachRound"
					onChange={(event) => setTimeForEachRound(event.target.value)}
				>
					<MenuItem value={240}>240 secs</MenuItem>
					<MenuItem value={300}>300 secs</MenuItem>
					<MenuItem value={360}>360 secs</MenuItem>
				</Select>
			</FormControl>

			<FormControl fullWidth>
				<InputLabel id="select-label-hasTriviaRound"> Trivia Rounds</InputLabel>
				<Select
					label="hasTriviaRound"
					onChange={(event) => setHasTriviaRound(event.target.value)}
				>
					<MenuItem value={true}>yes</MenuItem>
					<MenuItem value={false}>No</MenuItem>
				</Select>
			</FormControl>

			<Input
				type="text"
				placeholder="Enter No of teams"
				onChange={(event) => setNbOfTeams(event.target.value)}
			/>

			<br></br>
			<br></br>
			<Button variant="contained" onClick={handleOnClick}>
				Submit{" "}
			</Button>
		</Box>
	);
};

export default HostConfiguration;
