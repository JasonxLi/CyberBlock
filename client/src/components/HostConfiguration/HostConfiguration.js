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
		nbOfTeams, setNbOfTeams,
		nbOfRounds, setNbOfRounds,
		timeForEachRound, setTimeForEachRound,
		hasTriviaRound, setHasTriviaRound,
		difficulty, setDifficulty,
		setAlias,
		host_create_lobby
	} = useContext(Context);

	const formControlBox = {
		m: "20px",
		p: "10px",
		maxWidth: 300,
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
			<br />
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
				<InputLabel id="select-label-hasTriviaRound"> Play Trivia Rounds?</InputLabel>
				<Select
					label="hasTriviaRound"
					onChange={(event) => setHasTriviaRound(event.target.value)}
				>
					<MenuItem value={true}>Yes</MenuItem>
					<MenuItem value={false}>No</MenuItem>
				</Select>
			</FormControl>

			<br></br>
			<br></br>
			<Button variant="contained" onClick={handleOnClick}>
				Submit{" "}
			</Button>
		</Box>
	);
};

export default HostConfiguration;
