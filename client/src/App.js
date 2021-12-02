import './App.css';

import {  useContext, useState } from 'react';
import { Box, Typography} from '@material-ui/core'
import Layout from './components/Layout';
import { withStyles } from '@material-ui/styles';
import HostInterface from './components/HostInterface/HostInterface';
import PlayerInterface from './components/PlayerInterface/PlayerInterface'
import { Context } from './context/ContextProvider';
import GameInterface from './components/GameInterface/GameInterface';
import LobbyInterFace from './components/LobbyInterface/LobbyInterface';


function App() {

  const {endBuyPhase, rolledAttack,isHost, isInLobby,inBuyingPhase,userDefenses,pointTable, }=useContext(Context)
  
  
  const TitleText = withStyles({
    root: {
      fontWeight:600,
      color: '#088F8F',
      
    }
  })(Typography);
  
  return (
    <Layout >
      <Box align='center' >
        <TitleText variant='h4' > CYBERBLOCK</ TitleText>
      </Box>

      <br></br>
      <br></br>
        {!isInLobby
          ?
          <LobbyInterFace />
          :
          isHost
            ?
            <HostInterface /> 
            :
            <Box>{
              (inBuyingPhase && !endBuyPhase) ?
              
              <Typography > <PlayerInterface userDefenses={userDefenses}  /> </Typography>
              : 
              rolledAttack !== "" &&
              <GameInterface rolledAttack={rolledAttack.Name} attackId={rolledAttack.AttackID} pointTable={pointTable}/> 
            }
           </Box>
        } 

    </Layout>
  );
}

export default App;