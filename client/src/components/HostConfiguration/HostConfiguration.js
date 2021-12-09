import * as React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem, Button, Input } from '@material-ui/core'
import { useState, useContext } from 'react';
import { Context } from '../../context/ContextProvider'

const HostConfiguration = ({ children, setEndConfigurationPhase }) => {

    const { setNbOfRounds, host_create_lobby, nbOfRounds } = useContext(Context);

    const [difficulty, setDifficulty] = useState(1);
    const [timeForEachRound, setTimeForEachRound] = useState(0);
    const [hasTriviaRound, setHasTriviaRound] = useState(false);
    const [nbOfTeams, setNbOfTeams] = useState(2);
    const [nbOfDefenses, setNbOfDefenses] = useState(2);

    const formControlBox = {
        m: '20px',
        p: '10px',
        maxWidth: 140,
    }
    const outerBoxStyling = {
        display: 'flex',
        flexWrap: 'nowrap',
        mt: '80px',
        mx: '40px'
    }

    const handleOnClick = () => {
        setEndConfigurationPhase(true);
        host_create_lobby(nbOfTeams, nbOfRounds, nbOfDefenses, timeForEachRound, hasTriviaRound, difficulty)
    }

    return (

        <Box sx={formControlBox}>

            <FormControl fullWidth>
                <InputLabel id="select-label-round">Round</InputLabel>
                <Select
                    label="Round"
                    onChange={(event) => setNbOfRounds(event.target.value)}
                >
                    <MenuItem value={5}>5</MenuItem>
                    <MenuItem value={8}>8</MenuItem>
                    <MenuItem value={10}>10</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="select-label-difficulty">Difficulty</InputLabel>
                <Select
                    label="Difficulty"
                    onChange={(event) => setDifficulty(event.target.value)}
                >
                    <MenuItem value={1}>Beginner</MenuItem>
                    <MenuItem value={2}>Intermediate</MenuItem>
                    <MenuItem value={3}>Expert</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="select-label-timeForEachRound">Time per Round</InputLabel>
                <Select
                    label="timeForEachRound"
                    onChange={(event) => setTimeForEachRound(event.target.value)}
                >
                    <MenuItem value={240}>240 secs</MenuItem>
                    <MenuItem value={300}>300 secs</MenuItem>
                    <MenuItem value={360}>360 secs</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel id="select-label-hasTriviaRound"> Trivia Rounds</InputLabel>
                <Select
                    label="hasTriviaRound"
                    onChange={(event) => setHasTriviaRound(event.target.value)}
                >
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                </Select>
            </FormControl>

           
            <Input type="text" placeholder="Enter No of teams" onChange={(event) => setNbOfTeams(event.target.value)} />
               
           
            <br></br>
            <br></br>
            <Button variant="contained" onClick={handleOnClick}>Submit </Button>

        </Box>

    );
}

export default HostConfiguration;

