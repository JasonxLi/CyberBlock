import * as React from "react";
import {
	Box,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Grid,
	Typography,
} from "@material-ui/core";
import { useContext, Fragment } from "react";
import { Context } from "../../context/ContextProvider";
import { makeStyles } from '@material-ui/core/styles';

//the page is for the host specifically to changes the team members from each team
const ShuffleTeam = ({ children }) => {
	//shared states
	const { teamInfo, host_move_student, lobbyId } = useContext(Context);

	// when the host changes the team of each player call the host_moved_student event
	const handleChange = (newTeamId, socketId, oldTeamId) => {
		host_move_student(lobbyId, socketId, oldTeamId, newTeamId);
	};
	
	// Styling
	const useStyles = makeStyles((theme) => ({
		gridStyling: {
			boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
			borderRadius: '5px',
			position: 'relative',
			margin: '20px',
		},
		typographyStyling: {
			fontSize: '19px',
			margin: '15px',
		},
		headerStyling: {
			backgroundColor: '#FAF9F6',
			borderTop: 1,
			borderRight: 1,
			borderLeft: 1,
			border: '1px solid #D3D3D3',
		},
		playerStyling: {
			borderBottom: 1,
			borderRight: 0,
			borderLeft: 0,
			border: '1px solid #D3D3D3',
			padding: 4,
			alignItems: "center",
			justifyContent: "center",
		},
	}));

	const classes = useStyles();

	return (
		<Box>
			{teamInfo.map((item, index) => {
				return (
					<Grid container className={classes.gridStyling}
				  	>
						<Grid item xs={12} align="center" className={classes.headerStyling}>
							<Typography className={classes.typographyStyling}>Team {index + 1}</Typography>
						</Grid>
						{item.map((child) => {
							return (
								<Fragment>
									<Grid item xs={8} className={classes.playerStyling}>
										<Typography className={classes.typographyStyling}>{child.alias}</Typography>
									</Grid>
									<Grid item xs={4} className={classes.playerStyling}>
										<FormControl fullWidth>
											<InputLabel id="select-label-round">
												Switch Team
											</InputLabel>
											<Select
												label="Round"
												onChange={(event) =>
													handleChange(
														event.target.value,
														child.socketId,
														index
													)
												}
											>
											{teamInfo.map((item, index) => (
												<MenuItem value={index}>Team {index + 1}</MenuItem>
											))}
											</Select>
										</FormControl>
									</Grid>
								</Fragment>
							);
						})}
					</Grid>
				);
			})}
		</Box>
	);
};
export default ShuffleTeam;
