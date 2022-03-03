import * as React from 'react';
import { useState, useContext } from 'react';
import { Box, Typography, TableContainer, Table, TableBody, TableRow, TableCell, Button, TableHead, FormGroup, FormControl, FormControlLabel, Checkbox, Card, CardContent } from '@material-ui/core';
import { Context } from '../../context/ContextProvider';
import { makeStyles } from '@material-ui/core/styles';

//this page displys all the defense for players to purchase those defenses

const BuyingInterface = ({}) => {
  // importing shared states between different components
  const { alias, myTeamId, isTeamLeader, userEarnings, setUserEarnings, userDefenses, setUserDefenses, selectedDefenses, setSelectedDefenses, boughtDefenses, setGameStage, student_buy_defenses } = useContext(Context);

  const boxStyling = {
    p: 6,
    minWidth: '85%',
  };

  React.useEffect(() => {
    if (boughtDefenses.length !== 0 && boughtDefenses[myTeamId].length !== 0) {
      setGameStage('DONE_BUYING');
    }
  }, [boughtDefenses]);

  // a state to store the checkboxstate and see if its is checked or not
  const [isChecked, setIsChecked] = useState([]);

  // when the user toggles a checkbox the function removes the defense associated with the checkbox from the collection of user chosen defenses
  const removeDefense = (index, cost) => {
    //creates a shallow copy of defense list to removes the selected index from the list
    const tempDefenseList = [...selectedDefenses.slice(0, index), ...selectedDefenses.slice(index + 1, selectedDefenses.length)];
    //settting the temp list as the new selected defense list
    setSelectedDefenses(tempDefenseList);
    // adding the cost of the deleted item back to the total money of the user
    setUserEarnings(userEarnings + cost);
  };

  const getUserDefense = (value, name, cost, index, id) => {
    // adds the selected defense to the selected defense list in the specific index
    //the specific index helps keep track of the checkstate of the defense

    const currentIndex = [...isChecked];
    currentIndex[index] = value;
    setIsChecked(currentIndex);

    // if the user unclicks the checkbox and the defense in in the seelcted defense list the defense is removed from the selectd defense list
    if (!value && selectedDefenses.length > 0 && userEarnings >= 0) {
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

  const handleSubmit = () => {
    setGameStage('DONE_BUYING');
    student_buy_defenses();
  };

  const useStyles = makeStyles((theme) => ({
    headerStyling: {
      fontWeight: 700,
      fontSize: '16px',
      backgroundColor: '#FAF9F6',
    },
    activeCellStyling: {
      fontWeight: 600,
      color: 'white',
      backgroundColor: '#088F8F',
      fontSize: '16px',
    },
  }));

  const classes = useStyles();

  return (
    <Box sx={boxStyling}>
      <Card>
        <CardContent>
          {isTeamLeader ? (
            <Typography gutterBottom>{`You are the current team leader of team ${myTeamId + 1}, discuss with your team to decide what defenses to buy!`}</Typography>
          ) : (
            <Typography>{`You are not the current team leader of team ${myTeamId + 1}, discuss with your team to help your team leader decide what defenses to buy!`}</Typography>
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
      <TableContainer style={{ border: '1px solid #D3D3D3', borderRadius: '5px', height: '75vh', overflow: 'auto' }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerStyling}>Defenses</TableCell>
              <TableCell align="right" className={classes.headerStyling}>
                Cost
              </TableCell>
              <TableCell align="right" className={classes.headerStyling}>
                Submission
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userDefenses.map((row, index) => (
              <TableRow key={row.Name} className={isChecked[index] ? classes.activeCellStyling : 'none'}>
                <TableCell component="th" scope="row" className={isChecked[index] ? classes.activeCellStyling : 'none'}>
                  {row.Name}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right" className={isChecked[index] ? classes.activeCellStyling : 'none'}>
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
                          <Checkbox key={row.label} onChange={(event) => getUserDefense(event.target.checked, row.Name, row.cost, index, row.DefenseID)} disabled={row.cost > userEarnings && !isChecked[index]} checked={isChecked[index]} />
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
      <Button variant="contained" disabled={!isTeamLeader} onClick={() => handleSubmit()}>
        Submit
      </Button>
      {!isTeamLeader && (
        <Box sx={{ fontStyle: 'italic' }}>
          <Typography>Only team leader can submit</Typography>
        </Box>
      )}
    </Box>
  );
};
export default BuyingInterface;
