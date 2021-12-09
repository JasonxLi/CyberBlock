import * as React from 'react';
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core'
import {  useContext } from 'react';
import { Context } from '../../context/ContextProvider'

//Displays game scores for each team
const GameScore = ({ children }) => {
    
    //importing shared states to dispaly the points per team
    const {points} = useContext(Context);
    
    
    // displays the scores per team in a row and column format
    return (
        <Box>

            <TableContainer >
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead >
                        <TableRow>
                            <TableCell >Team</TableCell>
                            <TableCell align="right" sx={{ minWidth: 300 }}>Scores</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {points.map((row, index) =>{
                        <TableRow >
                            <TableCell component="th" scope="row">
                                Team{index+1}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row}
                            </TableCell>

                        </TableRow>
                    })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )


}
export default GameScore;