import * as React from 'react';
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, FormControl,InputLabel,Select,MenuItem, Button, Typography} from '@material-ui/core'
import {  useState, useContext } from 'react';
import { Context} from '../../context/ContextProvider'

const HostInterFace = ({ children}) => {
    const {lobbyId, roll,start_buy_phase,rolledAttack }=useContext(Context);
    const [endGame, setEndGame]= useState(false);
    const[isDisabled,setDisabled] =useState(true);
    const [round, setRound] = useState(0);
    const [difficulty, setDifficulty] = useState(1);
    const [roundCount, setRoundCount] = useState(0);

    const boxStyling={
        m:'20px',
        p:'10px',
    }
    const formControlBox={
        ...boxStyling,
        maxWidth:140,
    }
    const outerBoxStyling ={
        ...boxStyling,
        display: 'flex',
        flexWrap: 'nowrap',
        mt:'80px',
        mx:'40px'
    }
    
    
    const handleDifficultyChange=(value)=>{
        setDifficulty(value)
        setDisabled(false)
    }
    const rollPhase = ()=>{
       if(roundCount !== round){

        roll(lobbyId);
        setRoundCount(roundCount + 1)
       }
       else{
           setEndGame(true)

       }
    }

   const createData=(teamName, totalPoints, roundNumber) => {
        return { teamName, totalPoints, roundNumber};
    }
    
    const rows = [
    createData('Team Name', 'Total Points', 'Round No'),
    createData('Team 1', 305, 4),
    createData('Team 2', 452, 4),

    ].sort((a, b) => (a.totalPoints > b.totalPoints ? -1 : 1));

    return (

        <Box sx={boxStyling} >
            <Typography align='center' variant='h6'>{`Lobby created, use code ${lobbyId} to join.`}</Typography>
          
           
            <Box sx={outerBoxStyling}>
            

            <Box sx={formControlBox}>
            <Typography > Step 1</Typography>
                <FormControl fullWidth>
                    <InputLabel id="select-label-round">Round</InputLabel>
                    <Select
                        label="Round"
                        onChange={(event)=>  setRound(event.target.value)}
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
                        onChange={(event)=> handleDifficultyChange(event.target.value)}
                    >
                        <MenuItem value={1}>Beginner</MenuItem>
                        <MenuItem value={2}>Intermediate</MenuItem>
                        <MenuItem value={3}>Expert</MenuItem>
                    </Select>
                </FormControl>
               
            
            </Box>
           
            <Box  sx={boxStyling}>
                <Typography> Step 2</Typography>
                <Button  variant="contained" disabled={isDisabled} onClick={() => start_buy_phase(lobbyId)}>Start Game</Button>
                
            </Box>
            
            <Box  sx={boxStyling}>
                <Typography> Step 3</Typography>
                <Button  variant="contained"  disabled={isDisabled} onClick={rollPhase}>Roll Attack</Button>
            </Box>
            </Box>
            <br></br>
            <br></br>
            {
                rolledAttack !== "" &&
                <Typography>{`You rolled ${rolledAttack.Name}`}</Typography>

            }
             <br></br>
            <br></br>
                 
            <TableContainer >
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.teamName}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.totalPoints}
                            </TableCell>
                            <TableCell style={{ width: 160 }} align="right">
                                {row.roundNumber}
                            </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {children}
           
        </Box>
       
    )
}
export default HostInterFace;