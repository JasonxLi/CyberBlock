import * as React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  ButtonGroup,
  Grid,
  Tooltip,
} from '@material-ui/core';
import { Context } from '../../context/ContextProvider';
import { useState, useContext } from 'react';
import GameScore from '../GameScore/GameScore';
import Timer from '../Timer/Timer';
import { makeStyles } from '@material-ui/core/styles';

// this page displays the actual game play witht the attack rolled by the host ad user selected defense as buttons
const GameInterface = ({ isHost }) => {
  //importing shared states
  const {
    roundCount,
    nbOfRounds,
    timeForEachRound,
    resetTimer,
    setResetTimer,
    rolledAttack,
    selectedDefenses,
    defensesToSubmit,
    setDefensesToSubmit,
    hasSubmittedDefenses,
    setHasSubmittedDefenses,
    isTeamLeader,
    host_start_next_defense_round,
    host_end_game,
    student_play_defenses,
    nbOfDefenses,
  } = useContext(Context);

  const [count, setCount] = useState(0);

  //handles the user submitted defenses
  const handleChange = (defenseID, defenseName, defenseDescription) => {
    //avoids repetition
    if (defensesToSubmit.some(defense => defense.defenseID === defenseID)) {
      return;
    }

    //this statement prohibits the user from submitting more than selected number of defenses against the attack
    if (count < nbOfDefenses) {
      setCount(count + 1);
      //adds the selected defense to selectedItem list
      const tempDefense = {
        defenseName: defenseName,
        defenseID: defenseID,
        defenseDescription: defenseDescription,
      };
      setDefensesToSubmit([...defensesToSubmit, tempDefense]);
    }
    // this function allows the user to delete first defense from the selected item list and add the new defense to the selected item list
    else {
      const tempDefense = {
        defenseName: defenseName,
        defenseID: defenseID,
        defenseDescription: defenseDescription,
      };
      setDefensesToSubmit([...defensesToSubmit.slice(1), tempDefense]);
    }
  };

  const handleEndGame = () => {
    host_end_game();
  };

  const handleNextRound = () => {
    setResetTimer(true);
    host_start_next_defense_round();
  };

  const handleSubmitDefenses = () => {
    setHasSubmittedDefenses(true);
    student_play_defenses();
  };

  const useStyles = makeStyles(theme => ({
    activeCellStyling: {
      fontWeight: 600,
      color: 'white',
      backgroundColor: '#088F8F',
      fontSize: '16px',
      padding: '10px',
      margin: '10px',
    },
    typographyStyling: {
      fontSize: '20px',
      padding: '10px',
      margin: '10px',
    }
  }));
  const classes = useStyles();

  return (
    <Box>
      {isTeamLeader ? (
        <Typography gutterBottom className={classes.activeCellStyling}>
          Team Lead{' '}
        </Typography>
      ) : (
        <Typography className={classes.activeCellStyling}>Team Mate</Typography>
      )}
      <Timer
        initialSeconds={timeForEachRound}
        resetTimer={resetTimer}
        setResetTimer={setResetTimer}
      />
      {/* <Grid container justifyContent="flex-end">
        <Typography>{`Current round: ${roundCount}/${nbOfRounds}`}</Typography>
      </Grid> */}

      <GameScore />
      <Box>
        <Card style={{ marginTop: '15px', marginBottom: '20px' }}>
          <CardContent>
            <Typography align="center" variant="h6" color="text.secondary" gutterBottom>
              {`Attack Name: ${rolledAttack.Name} `}
            </Typography>
            <Typography align="center" variant="h6" color="text.secondary" gutterBottom>
              {`Attack Description: ${rolledAttack.Description} `}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      {isHost ? (
        <Box align="center">
          <ButtonGroup variant="text" aria-label="text button group">
            <Button
              align="center"
              variant="contained"
              onClick={() => {
                handleEndGame();
              }}
            >
              End Game
            </Button>
            {roundCount < nbOfRounds && (
              <Button
                variant="contained"
                onClick={() => {
                  handleNextRound();
                }}
              >
                Next Round
              </Button>
            )}
          </ButtonGroup>
        </Box>
      ) : (
        <Box>
          <Typography className={classes.typographyStyling}>Select up to {nbOfDefenses} defenses to play:</Typography>
          <Grid container spacing={2}>
            {selectedDefenses.map(item => {
              return (
                <Grid item>
                  <Button
                    variant="contained"
                    size="large"
                    color="blue"
                    onClick={() =>
                      handleChange(item.defenseID, item.defenseName, item.defenseDescritpion)
                    }
                  >
                    <Typography variant="h7" align="center" color="text.secondary" gutterBottom>
                      {item.defenseName}
                    </Typography>
                  </Button>
                </Grid>
              );
            })}
          </Grid>
          <Box>
            <Box sx={{ marginTop: '25px', marginBottom: '5px' }}>
              <Typography>Selected Defense: </Typography>
            </Box>
            <Card>
              <Box sx={{ margin: '15px', minHeight: '50px' }}>
                {defensesToSubmit.map(item => {
                  return <Typography>{item.defenseName}</Typography>;
                })}
              </Box>
            </Card>
          </Box>
          <br></br>
          <br></br>
          {isTeamLeader ? (
            <Box>
              <Typography>
                You are the current team leader, discuss with your team before submitting your
                defenses.
              </Typography>
            </Box>
          ) : (
            <Typography>
              You are not the current team leader, discuss with your team to help your team leader
              pick appropriate defenses.
            </Typography>
          )}
          <Button
            disabled={!isTeamLeader || hasSubmittedDefenses}
            variant="contained"
            onClick={() => handleSubmitDefenses()}
            style={{ marginTop: '15px', marginBottom: '15px' }}
          >
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};
export default GameInterface;
