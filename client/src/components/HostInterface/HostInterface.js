import * as React from 'react';
import { Box, Button, Typography} from '@material-ui/core'
import {  useState, useContext } from 'react';
import { Context} from '../../context/ContextProvider'
import ShuffleTeam from '../ShuffleTeam/ShuffleTeam';
import HostConfiguration from '../HostConfiguration/HostConfiguration';

const HostInterface = ({ teamInfo}) => {
   
    const {lobbyId, roll,start_buy_phase,rolledAttack , nbOfRounds }= useContext(Context);

    const [endGame, setEndGame]= useState(false);
    const [endConfigurationPhase, setEndConfigurationPhase] = useState(false);

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
    
    return (
        <Box>
            {endConfigurationPhase ?
                (
                    <Box sx={boxStyling} >
                        <Typography align='center' variant='h6'>{`Lobby created, use code ${lobbyId} to join.`}</Typography>
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
                        <ShuffleTeam />
                    </Box>
                )
                :
                (<HostConfiguration setEndConfigurationPhase={setEndConfigurationPhase} />)
            
            }

        </Box>

        
    )
}
export default HostInterface;