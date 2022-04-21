import * as React from 'react';
import {
  Box,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Typography,
  Grid,
} from '@material-ui/core';
import { useContext, useEffect, useState, Fragment } from 'react';
import { Context } from '../../context/ContextProvider';
import { makeStyles } from '@material-ui/core/styles';
import { CrownIcon } from '../Icons';

const useStyles = makeStyles(theme => ({
  leaderboardHeadStyling: {
    color: 'black',
    backgroundColor: '#FAF9F6',
    fontWeight: 700,
    fontSize: '17px',
  },
  leaderboardBodyStyling: {
    fontWeight: 500,
    borderBottom: 'none',
  },
  leaderboardWinnerStyling: {
    color: 'black',
    height: '30px',

    fontWeight: 600,
    fontSize: '17px',
    py: '2%',
    borderBottom: 'none',
  },
  typographyStyling: {
    fontSize: '19px',
    margin: '15px',
  },
  teamHeaderStyling: {
    color: 'black',
    backgroundColor: '#FAF9F6',
    fontWeight: 700,
    fontSize: '17px',
    padding: '16px',
  },
  teamBodyStyling: {
    color: 'black',
    padding: '16px',
    fontWeight: 500,
  },
  teamLeaderStyling: {
    color: 'white',
    padding: '16px',
    fontWeight: 600,
    backgroundColor: '#088F8F',
  },
}));

// Displays game scores and team information for each team
const GameScore = ({ children }) => {
  //importing shared states to dispaly the points per team
  const { scores, roundCount, gameStage, teamInfo, myTeamId, isHost, teamLeader } = useContext(Context);
  const [teamScore, setTeamScore] = useState([]);
  const [highScore, setHighScore] = useState(0);

  const gameStatsStyling = {
    position: gameStage === 'DEFEND_ATTACK' ? 'absolute' : 'none',
    left: gameStage === 'DEFEND_ATTACK' ? '69%' : 'none',
    top: gameStage === 'DEFEND_ATTACK' ? '50%' : 'none',
    width: gameStage === 'DEFEND_ATTACK' ? '400px' : 'none',
  };

  const scoreBoxStyling = {
    borderRadius: '9px',
    marginTop: '45px',
    marginLeft: '5px',
    width: gameStage === 'DEFEND_ATTACK' ? '100%' : 'none',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
  };

  const teamMembersStyling ={
    borderRadius: '9px',
    marginTop: '45px',
    marginLeft: '5px',
    width: gameStage === 'DEFEND_ATTACK' ? '100%' : 'none',
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
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
    <Box sx={gameStatsStyling}>
      <Box sx={scoreBoxStyling}>
        <TableContainer>
          <Table aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.leaderboardHeadStyling}>Team</TableCell>
                <TableCell align="right" className={classes.leaderboardHeadStyling}>
                  Scores
                </TableCell>
                <TableCell className={classes.leaderboardHeadStyling}></TableCell>
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
                          ? classes.leaderboardWinnerStyling
                          : classes.leaderboardBodyStyling
                      }
                    >
                      Team {data.teamID}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={
                        data.score !== 0 && data.score === highScore
                          ? classes.leaderboardWinnerStyling
                          : classes.leaderboardBodyStyling
                      }
                    >
                      {data.score}
                    </TableCell>
                    <TableCell
                      align="right"
                      className={
                        data.score !== 0 && data.score === highScore
                          ? classes.leaderboardWinnerStyling
                          : classes.leaderboardBodyStyling
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
    {!isHost
      ? (
        <Box sx={teamMembersStyling}>
          <Grid container>
            <Grid item xs={12}>
              <Typography className={classes.teamHeaderStyling}>Team {myTeamId + 1} Players</Typography>
            </Grid>
            {teamInfo.map((team, index) => {
              return (
                <Grid item xs={12}>
                  {
                    (myTeamId == index)
                    ? (
                      <Fragment>
                        {team.map((child) => {
                          return (
                            <Fragment>
                              {
                                (child.alias == teamLeader)
                                ? (
                                  <Typography className={classes.teamLeaderStyling}>
                                    {child.alias} (Team Leader)
                                  </Typography>
                                )
                                : (
                                  <Typography className={classes.teamBodyStyling}>
                                    {child.alias}
                                  </Typography>
                                )
                              }
                            </Fragment>
                          )
                        })}
                      </Fragment>
                    )
                    : (
                      null
                    )
                  }
                </Grid>
              );
            })}
          </Grid>
        </Box>
      )
      : null
    }
    </Box>
  );
};
export default GameScore;
