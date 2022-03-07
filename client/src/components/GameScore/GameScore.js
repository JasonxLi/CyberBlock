import * as React from 'react';
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import { useContext } from 'react';
import { Context } from '../../context/ContextProvider';
import { makeStyles } from '@material-ui/core/styles';
import { CrownIcon } from '../Icons';

const useStyles = makeStyles((theme) => ({
  head: {
    width: 500,
    color: 'black',
    backgroundColor: '#FAF9F6',
    fontWeight: 700,
    fontSize: '17px',
  },
  body: {
    fontWeight: 500,
    borderBottom: 'none',
  },
  winnerStyling: {
    color: 'black',
    height: '30px',

    fontWeight: 600,
    fontSize: '17px',
    py: '2%',
    borderBottom: 'none',
  },
}));

//Displays game scores for each team
const GameScore = ({ children }) => {
  //importing shared states to dispaly the points per team
  const { scores, roundCount, gameStage } = useContext(Context);

  const scoreBoxStyling = {
    borderRadius: '9px',
    marginTop: '45px',
    marginLeft: '5px',
    width: gameStage === 'DEFEND_ATTACK' ? '30%' : 'none',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    position: gameStage === 'DEFEND_ATTACK' ? 'absolute' : 'none',
    left: gameStage === 'DEFEND_ATTACK' ? '69%' : 'none',
    top: gameStage === 'DEFEND_ATTACK' ? '45%' : 'none',
  };

  const classes = useStyles();

  // displays the scores per team in a row and column format
  return (
    <Box sx={scoreBoxStyling}>
      <TableContainer>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.head}>Team</TableCell>
              <TableCell align="right" className={classes.head}>
                Scores
              </TableCell>
              <TableCell className={classes.head}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scores.map((score, index) => {
              return (
                <TableRow>
                  <TableCell component="th" scope="row" className={index === 0 && score !== 0 ? classes.winnerStyling : classes.body}>
                    Team {index + 1}
                  </TableCell>
                  <TableCell align="right" className={index === 0 && score !== 0 ? classes.winnerStyling : classes.body}>
                    {score}
                  </TableCell>
                  <TableCell align="right" className={index === 0 && score !== 0 ? classes.winnerStyling : classes.body}>
                    {index === 0 && score !== 0 && roundCount !== 0 ? <CrownIcon /> : ''}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
export default GameScore;
