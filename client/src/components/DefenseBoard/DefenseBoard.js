import * as React from 'react';
import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider';
import { Typography, Box, TableContainer, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const DefenseBoard = ({ }) => {
  const { playedDefenses, bestDefenses } = useContext(Context);

  const useStyles = makeStyles((theme) => ({
    headerStyling: {
      fontWeight: 700,
      fontSize: '16px',
      backgroundColor: '#FAF9F6',
    },
  }));

  const classes = useStyles();

  return (
    <Box>
      <TableContainer style={{ border: '1px solid #D3D3D3', borderRadius: '5px', marginTop: '15px' }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headerStyling}>Team</TableCell>
              <TableCell align="right" sx={{ minWidth: 300 }} className={classes.headerStyling}>
                Played Defenses
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={'correctAnswer'}>
              <TableCell component="th" scope="child">
                Best Defenses
              </TableCell>
              <TableCell align="right">
                {bestDefenses.map((bestDefense) => {
                  return <Typography>{bestDefense.Name}</Typography>;
                })}
              </TableCell>
            </TableRow>
            {playedDefenses.map((eachTeamsPlayedDefenses, index) => {
              return (
                <TableRow key={index + 1}>
                  <TableCell component="th" scope="child">
                    Team {index + 1}
                  </TableCell>
                  <TableCell align="right">
                    {eachTeamsPlayedDefenses.map(playedDefense => {
                      if (bestDefenses.some(e => e.Name === playedDefense.defenseName)) {
                        return (<Typography color="common.red">{playedDefense.defenseName} &#10003;</Typography>)
                      } else {
                        return (<Typography>{playedDefense.defenseName}</Typography>)
                      }
                    })}
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
export default DefenseBoard;
