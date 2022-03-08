import * as React from "react";
import { render } from "react-dom";
import { Box, Button, Container, Input, TextField, Typography } from "@material-ui/core";
import { Shadows } from "@material-ui/system";
import { useState, useContext, useEffect } from "react";
import { Context } from "../../context/ContextProvider";

const LobbyInterFace = ({ children }) => {
	const { setLobbyId, setIsInLobby, setIsHost, setAlias, setGameStage, student_join_lobby } = useContext(Context);

	//generic styling for the box
	const boxStyling = {
		border: "1px solid black",
		borderRadius: "20px",
		p: 6,
		align: "center",
		alignItems: "center",
		position: "absolute",
		width: 400,
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		display: "flex",
		flexDirection: "column"
	};

	const handleOnSubmit = () => {
		try {
			setIsInLobby(true);
			setGameStage('WAITING');
			student_join_lobby();
		} catch (error) {
			console.log(error);
		}
	}

	const handleChangeLobbyId = (lobbyId) => {
		setLobbyId(lobbyId.trim());
	}

	const handleChangeAlias = (alias) => {
		setAlias(alias);
	}

return (
		<Box sx={boxStyling} boxShadow={3}>
			<Box component="form" onSubmit={handleOnSubmit} >
				<Typography variant="h5">Join a lobby</Typography>
				<TextField
					margin="normal"
					required
					fullWidth
					label="Lobby ID"
					autoFocus
					onChange={(event) => handleChangeLobbyId(event.target.value)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					label="Name"
					onChange={(event) => handleChangeAlias(event.target.value)}
				/>
				<br></br>
				<Button type="submit" variant="contained" fullWidth>
					Join
				</Button>
			</Box>
			<br></br>
			<Typography>Or</Typography>
			<br></br>
			<Button
				type="button"
				variant="contained"
				fullWidth
				onClick={() => {
					setIsInLobby(true);
					setIsHost(true);
					setAlias("Host");
				}}
			>
				Create A Lobby
			</Button>
		</Box>
	);
};

export default LobbyInterFace;