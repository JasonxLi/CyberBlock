import * as React from "react";
import { useState, useContext } from "react";
import {
	Box,
	Typography,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	Button,
	TableHead,
	FormGroup,
	FormControl,
	FormControlLabel,
	Checkbox,
	Card,
	CardContent,
} from "@material-ui/core";
import { Context } from "../../context/ContextProvider";

//this page displys all the defense for players to purchase those defenses

const BuyingInterface = ({
	userDefenses,
	setTeamNumber,
	teamNumber,
	currentLead,
}) => {
	// importing shared states between different components
	const {
		selectedDefenses,
		setSelectedDefenses,
		setEndBuyPhase,
		userEarnings,
		setUserEarnings,
		alias,
		teamInfo,
		getLead,
	} = useContext(Context);

	const boxStyling = {
		p: 6,
		minWidth: "85%",
	};

	//state to see if the person player the game is the leader
	const [isLeader, setisLeader] = useState(false);

	// a state to store the checkboxstate and see if its is checked or not
	const [isChecked, setIsChecked] = useState([]);

	// when the user toggles a checkbox the function removes the defense associated with the checkbox from the collection of user chosen defenses
	const removeDefense = (index, cost) => {
		//creates a shallow copy of defense list to removes the selected index from the list
		const tempDefenseList = [
			...selectedDefenses.slice(0, index),
			...selectedDefenses.slice(index + 1, selectedDefenses.length),
		];
		//settting the temp list as the new selected defense list
		setSelectedDefenses(tempDefenseList);
		// adding the cost of the deleted item back to the total money of the user
		setUserEarnings(userEarnings + cost);
	};

	const getUserDefense = (value, name, cost, index, id) => {
		// adds the selected defense to the selected defense list in the specific index
		//the specific index helps keep track of the checkstate of the defense
		const currentIndex = [...isChecked];
		let tempIndex = { ...currentIndex[index] };
		tempIndex = value;
		currentIndex[index] = tempIndex;
		setIsChecked(currentIndex);

		// if the user unclicks the checkbox and the defense in in the seelcted defense list the defense is removed from the selectd defense list
		if (!value && selectedDefenses.length > 0 && userEarnings > 0) {
			selectedDefenses.map((item, index) => {
				if (item.defenseName === name) {
					removeDefense(index, item.defenseCost);
				}
			});
		}
		//else if the uer clicks on the checkbox to select the denfense it adds the defense to the selected defense list and the removes the defense cost from the total earnings
		else if (value && selectedDefenses.length >= 0 && userEarnings > 0) {
			const tempDefense = {
				defenseName: name,
				defenseCost: cost,
				defenseID: id,
				done: value,
			};
			setSelectedDefenses([...selectedDefenses, tempDefense]);
			if (userEarnings - cost >= 8) {
				setUserEarnings(userEarnings - cost);
			} else {
				setUserEarnings(userEarnings - cost);
			}
		}
	};
	// A function to retrive the name and the team number of the user
	const getMemberinfo = () => {
		teamInfo.map((team, index) => {
			team.map((player) => {
				if (player.alias === alias) {
					setTeamNumber(index + 1);
					// if(player.socketId == currentLead[index].socketId){
					//     setisLeader(true)
					// }
				}
			});
		});
	};
	getMemberinfo();
	console.log(currentLead);
	return (
		<Box sx={boxStyling}>
			<Card>
				<CardContent>
					<Typography gutterBottom>{alias}</Typography>
					<Typography gutterBottom>You are in Team {teamNumber}</Typography>
					{isLeader ? (
						<Typography gutterBottom>You are the current leader</Typography>
					) : (
						<Typography></Typography>
					)}
				</CardContent>
			</Card>
			<br></br>
			<br></br>

			<Typography variant="h7" color="text.secondary" gutterBottom>
				Earnings:${userEarnings}
			</Typography>

			<br></br>
			<br></br>
			<TableContainer>
				<Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
					<TableHead>
						<TableRow>
							<TableCell>Defenses</TableCell>
							<TableCell align="right">Cost</TableCell>
							<TableCell align="right">Submission</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{userDefenses.map((row, index) => (
							<TableRow key={row.Name}>
								<TableCell component="th" scope="row">
									{row.Name}
								</TableCell>
								<TableCell style={{ width: 160 }} align="right">
									{row.cost}
								</TableCell>

								<TableCell style={{ width: 160 }} align="right">
									<FormControl component="fieldset" variant="standard">
										<FormGroup>
											<FormControlLabel
												control={
													// The disabled prop checks if the cost of the selected defense is less than the total user earning, if so disbales the defense to restrict the user fromm purchasing that defense
													// onChange handles any time the user toggles the checkbox
													// the checkfeature retrives the value from the isChecked array
													<Checkbox
														key={row.label}
														onChange={(event) =>
															getUserDefense(
																event.target.checked,
																row.Name,
																row.cost,
																index,
																row.DefenseID
															)
														}
														disabled={
															row.cost > userEarnings && !isChecked[index]
																? true
																: false || isLeader
																? true
																: false
														}
														checked={isChecked[index]}
													/>
												}
											/>
										</FormGroup>
									</FormControl>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<br></br>
			<Button variant="contained" onClick={() => setEndBuyPhase(true)}>
				Submit
			</Button>
		</Box>
	);
};
export default BuyingInterface;
