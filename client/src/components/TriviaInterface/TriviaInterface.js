import * as React from 'react';
import { Box, Button, ButtonGroup, Typography, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider'

const TriviaInterface = ({ isHost, isTeamLeader }) => {

    const { host_gets_trivia_question, host_ends_trivia_round, triviaQuestion, triviaAnswer, setTriviaAnswer,
        student_submit_trivia_answer, submittedTriviaAnswer, setSubmittedTriviaAnswer, correctTriviaAnswer } = useContext(Context);;

    const boxStyling = {
        m: '20px',
        p: '10px',
    }

    const handleChange = (event) => {
        setTriviaAnswer(event.target.value);
    };

    const handleSubmitAnswer = () => {
        student_submit_trivia_answer();
        setSubmittedTriviaAnswer(true);
    }

    if (isHost) {
        return (
            <Box>
                <Box sx={boxStyling} >
                    {triviaQuestion &&
                        <Box sx={boxStyling} >
                            <Typography align='center' variant='h6'>{`Trivia Question: ${triviaQuestion.Question}`}</Typography>
                            <br />
                            <Typography align='center' variant='h6'>{`Option 1: ${triviaQuestion.Option1}`}</Typography>
                            <Typography align='center' variant='h6'>{`Option 2: ${triviaQuestion.Option2}`}</Typography>

                            {triviaQuestion.Option3 && <Typography align='center' variant='h6'>{`Option 3: ${triviaQuestion.Option3}`}</Typography>}
                            {triviaQuestion.Option4 && <Typography align='center' variant='h6'>{`Option 4: ${triviaQuestion.Option4}`}</Typography>}
                            <br />
                            <Typography align='center' variant='h6'>{`Correct Answer: ${triviaQuestion.Answer}`}</Typography>
                        </Box>
                    }
                </Box>
                <Box align='center'>
                    <ButtonGroup variant="text" aria-label="text button group">
                        <Button align='center' variant="contained" onClick={() => { host_ends_trivia_round() }}>End Trivia Round</Button>
                        <Button variant="contained" onClick={() => { host_gets_trivia_question() }}>Next Trivia Question</Button>
                    </ButtonGroup>
                </Box>
            </Box>
        )
    }
    else {
        return (
            <Box>
                <Box sx={boxStyling} >
                    {triviaQuestion
                        ?
                        <Box sx={boxStyling} >
                            <Typography align='center' variant='h6'>{`Trivia Question: ${triviaQuestion.Question}`}</Typography>
                            <br /><br />
                            <FormControl fullWidth>
                                <InputLabel id="trivia-answer-label">Options</InputLabel>
                                <Select
                                    labelId="trivia-answer-label"
                                    id="trivia-select"
                                    value={triviaAnswer}
                                    label="TriviaAnswer"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={triviaQuestion.Option1}>{triviaQuestion.Option1}</MenuItem>
                                    <MenuItem value={triviaQuestion.Option2}>{triviaQuestion.Option2}</MenuItem>
                                    {triviaQuestion.Option3 && <MenuItem value={triviaQuestion.Option3}>{triviaQuestion.Option3}</MenuItem>}
                                    {triviaQuestion.Option3 && <MenuItem value={triviaQuestion.Option4}>{triviaQuestion.Option4}</MenuItem>}

                                </Select>
                            </FormControl>
                            <br /> <br />
                            {isTeamLeader && <Button disabled={submittedTriviaAnswer} align='center' variant="contained" onClick={() => handleSubmitAnswer()}>Submit Answer</Button>}

                            {submittedTriviaAnswer &&
                                <Box>
                                    <Typography align='center' variant='h6'>{`Your team submitted: ${triviaAnswer}`}</Typography>
                                    <Typography align='center' variant='h6'>{`The correct answer is: ${correctTriviaAnswer}`}</Typography>
                                </Box >}
                        </Box>
                        :
                        <Typography align='center' variant='h6'>{`Waiting for a trivia question...`}</Typography>
                    }
                </Box>
            </Box>
        )
    }

}
export default TriviaInterface;