import './App.css';

import { useContext } from 'react';
import { Box, Typography } from '@material-ui/core'
import Layout from './components/Layout';
import { withStyles } from '@material-ui/styles';
import HostInterface from './components/HostInterface/HostInterface';
import PlayerInterface from './components/PlayerInterface/PlayerInterface'
import { Context } from './context/ContextProvider';

import LobbyInterFace from './components/LobbyInterface/LobbyInterface';
import ChatInterface from './components/ChatInterface/ChatInterface';


function App() {

  const { isHost, isInLobby } = useContext(Context)


  const TitleText = withStyles({
    root: {
      fontWeight: 600,
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
      {isInLobby
        ?
        <Box>
          {isHost
            ?
            <HostInterface />
            :
            <PlayerInterface />}
            <br/><br/><br/><br/>
          <ChatInterface />
        </Box>
        :
        <LobbyInterFace />

      }
      <br></br>

    </Layout>
  );
}

export default App;