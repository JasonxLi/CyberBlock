import * as React from 'react';
import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider';
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, TableHead, Typography, Tooltip } from '@material-ui/core';
import { makeStyles, styled } from '@material-ui/core/styles';

const ToBeStyledTooltip = ({ className, ...props }) => (
  <Tooltip {...props} classes={{ tooltip: className }} />
);
// Change the style of the tooltip
const StyledTooltip = styled(ToBeStyledTooltip)(({ theme }) => ({
  fontSize: '15px',
  backgroundColor: '#F5F5F5',
  color: 'rgba(0, 0, 0, 15)',
  border: '2px solid #dadde9',
}));

const BoughtDefensesBoard = ({ }) => {
  const { boughtDefenses } = useContext(Context);

  const useStyles = makeStyles((theme) => ({
    headerStyling: {
      fontWeight: 700,
      fontSize: '16px',
    },
  }));
  const classes = useStyles();

  return (
    <Box>
      <TableContainer style={{ border: '1px solid #D3D3D3', borderRadius: '5px', marginTop: '20px' }}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead
            style={{
              backgroundColor: '#FAF9F6',
            }}
          >
            <TableRow>
              <TableCell className={classes.headerStyling}>Team</TableCell>
              <TableCell align="right" sx={{ minWidth: 300 }} className={classes.headerStyling}>
                Bought Defenses
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boughtDefenses.map((defenses, index) => {
              return (
                <TableRow key={index + 1}>
                  <TableCell component="th" scope="child">
                    Team {index + 1}
                  </TableCell>
                  <TableCell align="right">
                    {defenses.map((defense) => {
                      return <StyledTooltip title={defense.defenseDescritpion} arrow placement='right-end'><Typography>{defense.defenseName}</Typography></StyledTooltip>;
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
export default BoughtDefensesBoard;
