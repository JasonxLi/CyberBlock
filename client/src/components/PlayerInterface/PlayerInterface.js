import * as React from 'react';
import { useContext,useState } from 'react';
import { Box, Typography, } from '@material-ui/core'
import { Context } from '../../context/ContextProvider';
import GameInterface from '../GameInterface/GameInterface';
import BuyingInterface from '../BuyingInterface/BuyingInterface';
import PlayerInformation from '../PlayerInformation/PlayerInformation';


const PlayerInterface = ({ }) => {

    const { endBuyPhase, rolledAttack, inBuyingPhase, userDefenses, pointTable, showPlayerPhase } = useContext(Context)
    
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
        
        
        </Box>
    );

}
export default PlayerInterface;