import * as React from 'react';
import { useContext,useState } from 'react';
import { Box, Typography, } from '@material-ui/core'
import { Context } from '../../context/ContextProvider';
import GameInterface from '../GameInterface/GameInterface';
import BuyingInterface from '../BuyingInterface/BuyingInterface';
import PlayerInformation from '../PlayerInformation/PlayerInformation';
import ChatInterface from '../ChatInterface/ChatInterface';

// tha main player interface that handles the the change of pages for the players
const PlayerInterface = ({ }) => {
    // shared states
    const { endBuyPhase, rolledAttack, inBuyingPhase, userDefenses, pointTable, showPlayerPhase } = useContext(Context)
    
    //local state to get the team number for teamleader
    const [teamNumber, setTeamNumber] =useState()
    
    
    return (
        <Box>
        {
            !showPlayerPhase ?
                <Typography>Please wait </Typography>
                :
                !inBuyingPhase ?
                    (<PlayerInformation  />)
                    :
                    (
                        (inBuyingPhase && !endBuyPhase) ?
                        
                        (
                            <BuyingInterface userDefenses={userDefenses} setTeamNumber={setTeamNumber} teamNumber={teamNumber}/>
                        )
                        :
                        (    
                            rolledAttack !== "" &&
                            <GameInterface rolledAttack={rolledAttack} attackId={rolledAttack.AttackID} pointTable={pointTable} teamNumber={teamNumber} />
                        )
                    )
                }
        <ChatInterface/>
        </Box>
    );

}
export default PlayerInterface;