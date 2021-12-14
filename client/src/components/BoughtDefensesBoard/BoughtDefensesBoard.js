import * as React from 'react';
import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider'
import {
    Box,
    TableContainer,
    Table,
    TableBody,
    TableRow,
    TableCell,
    TableHead,
    Typography,
} from "@material-ui/core";

const BoughtDefensesBoard = ({ }) => {

    const { boughtDefenses } = useContext(Context);;

    const boxStyling = {
        m: '20px',
        p: '10px',
    }

    return (
        <Box>
            <TableContainer>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Team</TableCell>
                            <TableCell align="right" sx={{ minWidth: 300 }}>
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
                                        {defenses.map(defense =>{
                                            return (<Typography>{defense.defenseName}</Typography>)
                                        })}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    )

}
export default BoughtDefensesBoard;