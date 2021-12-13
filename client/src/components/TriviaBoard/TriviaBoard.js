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
} from "@material-ui/core";

const TriviaBoard = ({ }) => {

    const { submittedTriviaAnswers, triviaQuestion } = useContext(Context);;

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
                                Submitted Answer
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={'correctAnswer'}>
                            <TableCell component="th" scope="child">
                                Correct Answer
                            </TableCell>
                            <TableCell align="right">
                                {triviaQuestion.Answer}
                            </TableCell>;
                        </TableRow>
                        {submittedTriviaAnswers.map((answer, index) => {
                            return (
                                <TableRow key={index + 1}>
                                    <TableCell component="th" scope="child">
                                        Team {index + 1}
                                    </TableCell>
                                    <TableCell align="right">
                                        {answer}
                                    </TableCell>;
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );

}
export default TriviaBoard;