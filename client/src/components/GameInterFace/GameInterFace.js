import * as React from "react";
import {
	Box,
	Typography,
	Card,
	CardContent,
	Button,
	Grid,
	Tooltip,
} from "@material-ui/core";
import { Context } from "../../context/ContextProvider";
import { useState, useContext } from "react";

// this page displays the actual game play witht the attack rolled by the host ad user selected defense as buttons
const GameInterface = ({ rolledAttack, attackId, teamNumber }) => {
	//importing shared states
	const {
		selectedDefenses,
		points,
		receive_points_per_round,
		lobbyId,
		setPoints,
	} = useContext(Context);

	const [selectedItems, setSelectedItems] = useState([]);
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
			setSelectedItems([...selectedItems, tempDefense]);
		}
		// this function allows the user to delete first defense from the selected item list and add the new defense to the selected item list
		else {
			const tempDefense = {
				defenseName: defenseName,
				defenseID: defenseID,
			};
			setSelectedItems([...selectedItems.slice(1), tempDefense]);
		}
	};
	// once the user hits the submit button the function checks to see if there is a point associated with the attack and defense ID and if so
	// awards the user with points which is stored in an index that corelated to the team number
	const checkPoints = () => {
		selectedItems.map((defense) => {
			receive_points_per_round(
				lobbyId,
				defense.defenseID,
				attackId,
				teamNumber
			);
		});
	};

	return (
		<Box sx={boxStyling}>
			<Typography color="text.secondary">
				Points:{points[teamNumber - 1]}
			</Typography>

			<Box sx={{ m: "30px" }}>
				<Card>
					<CardContent>
						<Tooltip title={rolledAttack.Description}>
							<Typography
								align="center"
								variant="h6"
								color="text.secondary"
								gutterBottom
							>
								{`Attack rolled: ${rolledAttack.Name} `}
							</Typography>
						</Tooltip>
					</CardContent>
				</Card>
			</Box>
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
						{selectedItems.map((item) => {
							return <Typography>{item.defenseName}</Typography>;
						})}
					</Box>
				</Card>
			</Box>
			<br></br>
			<br></br>
			<Button variant="contained" onClick={checkPoints}>
				Submit
			</Button>
		</Box>
	);
};
export default GameInterface;
