import * as React from "react";
import { Box, Button, Input } from "@material-ui/core";
import { useContext } from "react";
import { Context } from "../../context/ContextProvider";

const LobbyInterFace = ({ children }) => {
	const { setLobbyId, setIsInLobby, setIsHost, setAlias, setGameStage, student_join_lobby } = useContext(Context);

	//generic styling for the box
	const boxStyling = {
		p: 6,
		border: "1px solid black",
		borderRadius: "10px",
		width: 250,
		align: "center",
		position: "absolute",
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
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
		<Box sx={boxStyling}>
			<Button
				variant="contained"
				onClick={() => {
					setIsInLobby(true);
					setIsHost(true);
					setAlias("Host");
				}}
			>
				Create Lobby
			</Button>
			<h4>or</h4>

			<Input
				type="text"
				placeholder="Enter Lobby ID"
				onChange={(event) => handleSetLobbyId(event.target.value)}
			/>
			<br></br>
			<br></br>
			<Input
				type="text"
				placeholder="Enter Name"
				onChange={(event) => setAlias(event.target.value)}
			/>
			<br></br>
			<br></br>
			<Button variant="contained" onClick={() => handleOnClick()}>
				Join Lobby
			</Button>
		</Box>
	);
};

export default LobbyInterFace;
