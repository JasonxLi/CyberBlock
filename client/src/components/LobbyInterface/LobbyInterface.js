import * as React from "react";
import { Box, Button, Container, Input, TextField, Typography } from "@material-ui/core";
import { Shadows } from "@material-ui/system";
import { useContext } from "react";
import { Context } from "../../context/ContextProvider";

const LobbyInterFace = ({ children }) => {
	const { setLobbyId, setIsInLobby, setIsHost, setAlias, setGameStage, student_join_lobby } = useContext(Context);

	//generic styling for the box
	const boxStyling = {
		p: 6,
		border: "1px solid black",
		borderRadius: "20px",
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

	const handleOnClick = () => {
		setIsInLobby(true);
		setGameStage('WAITING');
		student_join_lobby();
	}

	const handleSetLobbyId = (lobbyId) => {
		//get rid of white spaces
		setLobbyId(lobbyId.trim());
	}

	return (
		<Container maxWidth="xs">
			<Box sx={boxStyling} boxShadow={3}>
				<Typography variant="h5">Join a lobby</Typography>
				<TextField
					margin="normal"
					required
					fullWidth
					label="Lobby ID"
					autoFocus
					onChange={(event) => handleSetLobbyId(event.target.value)}
				/>
				<TextField
					margin="normal"
					required
					fullWidth
					label="Name"
					onChange={(event) => setAlias(event.target.value)}
				/>
				<br></br>
				<Button
					variant="contained"
					fullWidth
					onClick={() => handleOnClick()}
				>
					Join
				</Button>
				<br></br>
				<Typography>Or</Typography>
				<br></br>
				<Button
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
		</Container>
	);
};

export default LobbyInterFace;
