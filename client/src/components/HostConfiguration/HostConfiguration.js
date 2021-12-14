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
const HostConfiguration = ({ children }) => {
	// shared states
	const {
		setGameStage,
		setNbOfTeams, setNbOfRounds, setTimeForEachRound, setUserEarnings,
		hasTriviaRound, setHasTriviaRound, difficulty, setDifficulty,
		host_create_lobby
	} = useContext(Context);

	const formControlBox = {
		m: "20px",
		p: "10px",
		maxWidth: 500,
	};
	// handles the submission of the configuration by calling the create lobby event
	const handleOnClick = () => {
		//changes to the next interface
		setGameStage('WAITING');
		host_create_lobby();
	};

	return (
		<Box sx={formControlBox}>
			<Input
				fullWidth
				type="text"
				placeholder="Enter Number of teams"
				onChange={(event) => setNbOfTeams(event.target.value)}
			/>
			<br /> <br />
			<Input
				fullWidth
				type="text"
				placeholder="Enter Number of Rounds"
				onChange={(event) => setNbOfRounds(event.target.value)}
			/>

			<br /> <br />
			<Input
				fullWidth
				type="text"
				placeholder="Enter Time Allowed For Each Round (in seconds)"
				onChange={(event) => setTimeForEachRound(event.target.value)}
			/>
			<br /><br />
			<Input
				fullWidth
				type="text"
				placeholder="Enter Amount of Starting Money"
				onChange={(event) => setUserEarnings(event.target.value)}
			/>
			<br /><br />
			<FormControl fullWidth>
				<InputLabel id="select-difficulty-label">Difficulty</InputLabel>
				<Select
					labelId="select-difficulty-label"
					id="select-difficulty"
					value={difficulty}
					label="Difficulty"
					onChange={(event) => setDifficulty(event.target.value)}
				>
					<MenuItem value={1}>Beginner</MenuItem>
					<MenuItem value={2}>Intermediate</MenuItem>
					<MenuItem value={3}>Expert</MenuItem>
				</Select>
			</FormControl>
			<br />
			<FormControl fullWidth>
				<InputLabel id="select-label-hasTriviaRound">Play Trivia Rounds?</InputLabel>
				<Select
					labelId="select-label-hasTriviaRound"
					id="select-hasTrivia"
					value={hasTriviaRound}
					label="hasTrivia"
					onChange={(event) => setHasTriviaRound(event.target.value)}
				>
					<MenuItem value={true}>Yes</MenuItem>
					<MenuItem value={false}>No</MenuItem>
				</Select>
			</FormControl>

			<br></br>
			<br></br>
			<Button variant="contained" onClick={handleOnClick}>
				Submit
			</Button>
		</Box>
	);
};

export default HostConfiguration;
