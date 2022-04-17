import * as React from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../../context/ContextProvider';
import { makeStyles } from '@material-ui/core/styles';
import { CrownIcon } from '../Icons';

const useStyles = makeStyles(theme => ({
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
  const [teamScore, setTeamScore] = useState([]);
  const [highScore, setHighScore] = useState(0);

  const scoreBoxStyling = {
    borderRadius: '9px',
    marginTop: '45px',
    marginLeft: '5px',
    width: gameStage === 'DEFEND_ATTACK' ? '30%' : 'none',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    position: gameStage === 'DEFEND_ATTACK' ? 'absolute' : 'none',
    left: gameStage === 'DEFEND_ATTACK' ? '69%' : 'none',
    top: gameStage === 'DEFEND_ATTACK' ? '50%' : 'none',
    width: gameStage === 'DEFEND_ATTACK' ? '400px' : 'none',
  };

  const classes = useStyles();

  useEffect(() => {
    const scoreArray = [];
    scores.map((item, index) => {
      const tempScore = {
        teamID: index + 1,
        score: item,
      };
      scoreArray.push(tempScore);
    });
    const sorted = [...scoreArray].sort((a, b) => {
      return a.score > b.score ? -1 : a.score < b.score ? 1 : 0;
    });
    setTeamScore(sorted);
    setHighScore(sorted[0].score);
  }, [scores]);

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
            {teamScore.map((data, index) => {
              return (
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    className={
                      data.score !== 0 && data.score === highScore
                        ? classes.winnerStyling
                        : classes.body
                    }
                  >
                    Team {data.teamID}
                  </TableCell>
                  <TableCell
                    align="right"
                    className={
                      data.score !== 0 && data.score === highScore
                        ? classes.winnerStyling
                        : classes.body
                    }
                  >
                    {data.score}
                  </TableCell>
                  <TableCell
                    align="right"
                    className={
                      data.score !== 0 && data.score === highScore
                        ? classes.winnerStyling
                        : classes.body
                    }
                  >
                    {data.score !== 0 && data.score === highScore && roundCount !== 0 ? (
                      <CrownIcon />
                    ) : (
                      ''
                    )}
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
