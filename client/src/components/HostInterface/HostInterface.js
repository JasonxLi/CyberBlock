import * as React from 'react';
import { Box, TableContainer, Table, TableBody, TableRow, TableCell, Button, Typography} from '@material-ui/core'
import {  useState, useContext } from 'react';
import { Context} from '../../context/ContextProvider'

const HostInterFace = ({ children}) => {
   
    const {lobbyId, roll,start_buy_phase,rolledAttack , nbOfRounds, teaminfo, setTeamInfo}=useContext(Context);
    const [endGame, setEndGame]= useState(false);

    const [roundCount, setRoundCount] = useState(0);

    const boxStyling={
        m:'20px',
        p:'10px',
    }
   
    const rollPhase = ()=>{
       if(roundCount !== nbOfRounds){
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

            {/* })} */}
            
           
            <Box  sx={boxStyling}>
               
                <Button  variant="contained" onClick={() => start_buy_phase(lobbyId)}>Start Game</Button>
                <br></br>
                <br></br>            
                <Button  variant="contained"  onClick={rollPhase}>Roll Attack</Button>
            </Box>
            
            <br></br>
            <br></br>
            {
                rolledAttack !== "" &&
                <Typography>{`You rolled ${rolledAttack.Name}`}</Typography>

            }
             <br></br>
            <br></br>
                 
            {/* <TableContainer >
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
            </TableContainer> */}
            {children}
           
        </Box>
       
    )
}
export default HostInterFace;