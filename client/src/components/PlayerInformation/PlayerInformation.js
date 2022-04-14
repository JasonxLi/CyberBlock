import * as React from "react";
import {
	Box,
	TableContainer,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableHead,
	Grid,
	Typography,
} from "@material-ui/core";
import { useContext, Fragment } from "react";
import { Context } from "../../context/ContextProvider";
import { makeStyles } from '@material-ui/core/styles';

//displays the current team member info and displays in a row and column format
const PlayerInfromation = ({}) => {
	//shared state
	const { teamInfo } = useContext(Context);
	
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
								<Grid item xs={12} className={classes.playerStyling}>
									<Typography className={classes.typographyStyling}>{child.alias}</Typography>
								</Grid>
							);
						})}
					</Grid>
				);
			})}
		</Box>
	);
};
export default PlayerInfromation;
