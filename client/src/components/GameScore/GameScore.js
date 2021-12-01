import * as React from 'react';
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core'
import {  useState, useContext } from 'react';
import { Context} from '../../context/ContextProvider'

const GameScore = ({ children}) => {
    const {teamInfo, host_move_student, lobbyId }= useContext(Context);
    const createData=(teamName, totalPoints, roundNumber) => {
        return { teamName, totalPoints, roundNumber};
    }
   
    const rows = [
    createData('Team Name', 'Total Points', 'Round No'),
    createData('Team 1', 305, 4),
    createData('Team 2', 452, 4),

    ].sort((a, b) => (a.totalPoints > b.totalPoints ? -1 : 1));

   
    return (
        <Box>
            
            {/* {teaminfo.map(row =>{ */}
                <TableContainer >
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        {/* {row.map((row) => ( */}
                            <TableRow >
                            <TableCell component="th" scope="row">
                                {/* {member.socketId} */}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {/* {member.alias} */}
                            </TableCell>
        
                            </TableRow>
                        {/* ))} */}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )


}
export default GameScore;