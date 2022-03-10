import * as React from "react";
import {
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Button,
	Input,
	Typography,
	TextField,
	Grid,
} from "@material-ui/core";
import { useState, useContext } from "react";
import { Context } from "../../context/ContextProvider";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createTheme({
	palette: {
		primary: {
			main: '#F5F5F5',
		},
		secondary: {
			main: '#DCDCDC',
		},
	},
  });

// page to allow the host to add configurations to the game
const HostConfiguration = ({ children }) => {
	// shared states
	const {
		setGameStage,
		setNbOfTeams,
		setNbOfRounds,
		setTimeForEachRound,
		setUserEarnings,
		nbOfDefenses,
		setNbOfDefenses,
		hasTriviaRound,
		setHasTriviaRound,
		difficulty,
		setDifficulty,
		host_create_lobby,
		setIsHost,
		setAlias,
		setIsInLobby
	} = useContext(Context);

	const boxStyling = {
		fontFamily: 'Titillium Web',
		border: "1px solid black",
		borderRadius: "20px",
		backgroundColor: "#DCDCDC",
		p: "10px",
		align: "center",
		alignItems: "center",
		position: "absolute",
		width: 500,
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		display: "flex",
		flexDirection: "column"
	};
	// handles the submission of the configuration by calling the create lobby event
	const handleOnSubmit = () => {
		// Sends variable changes
		setNbOfTeams(teamCount);
		setNbOfRounds(roundCount);
		setTimeForEachRound(roundTime);
		setUserEarnings(startingMoney);
		// Changes to the next interface
		setGameStage('WAITING');
		host_create_lobby();
	}

	const handleChangeTeamCount = e => {
		changeTeamCount(e.target.value);
	}
	const handleChangeRoundCount = e => {
		changeRoundCount(e.target.value);
	}
	const handleChangeRoundTime = e => {
		changeRoundTime(e.target.value);
	}
	const handleChangeStartingMoney = e => {
		changeStartingMoney(e.target.value);
	}

	return (
		<ThemeProvider theme={theme}>
		<Box component="form" onSubmit={handleOnSubmit} sx={boxStyling} boxShadow={3}>
			<Typography variant="h5">Create New Lobby</Typography>
			<br></br>
			<TextField
				margin="normal"
				required
				fullWidth
				label="Number of teams"
				type="number"
				autoFocus
				onChange={(event) => setNbOfTeams(event.target.value)}
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				type="number"
				label="Number of Rounds"
				onChange={(event) => setNbOfRounds(event.target.value)}
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				type="number"
				label="Round Duration (in seconds)"
				onChange={(event) => setTimeForEachRound(event.target.value)}
			/>
			<TextField
				margin="normal"
				required
				fullWidth
				type="number"
				placeholder="Enter Amount of Starting Money"
				onChange={(event) => setUserEarnings(event.target.value)}
			/>

			<br /><br />
			<FormControl fullWidth>
				<InputLabel id="select-nbOfDefenses-label">Number of Defenses Played Each Round</InputLabel>
				<Select
					fontFamily= 'arial'
					labelId="select-nbOfDefenses-label"
					id="select-nbOfDefenses"
					value={nbOfDefenses}
					label="nbOfDefenses"
					onChange={(event) => setNbOfDefenses(event.target.value)}
				>
					<MenuItem value={2}>2</MenuItem>
					<MenuItem value={3}>3</MenuItem>
					<MenuItem value={4}>4</MenuItem>
				</Select>
			</FormControl>
			<br></br>
			<Grid container spacing={4}>
				<Grid item xs>
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
				</Grid>
				<Grid item xs>
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
				</Grid>
			</Grid>
			<br></br>
			<br></br>
			<Grid container spacing={4}>
				<Grid item xs>
					<Button
						variant="contained"
						fullWidth
						type="submit"
					>
						Create The Lobby
					</Button>
				</Grid>
				<Grid item xs>
					<Button
						variant="contained"
						fullWidth
						onClick={() => {
							setIsInLobby(false);
							setIsHost(false);
							setAlias("");
						}}
					>
						Cancel
					</Button>
				</Grid>
			</Grid>
		</Box>
		</ThemeProvider>
	);
};

export default HostConfiguration;
