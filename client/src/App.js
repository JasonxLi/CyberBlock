import './App.css';

import { useContext } from 'react';
import { Box, Typography } from '@material-ui/core';
import Layout from './components/Layout';
import { withStyles } from '@material-ui/styles';
import HostInterface from './components/HostInterface/HostInterface';
import PlayerInterface from './components/PlayerInterface/PlayerInterface';
import { Context } from './context/ContextProvider';

import LobbyInterFace from './components/LobbyInterface/LobbyInterface';
import ChatInterface from './components/ChatInterface/ChatInterface';

function App() {
  const { isHost, isInLobby } = useContext(Context);

  const TitleText = withStyles({
    root: {
      fontWeight: 600,
      color: '#088F8F',
    },
  })(Typography);
  const outerBoxStyling = {
    display: 'flex',
    margin: '15px',
    position: 'relative',
  };
  const interfaceBoxStyling = {
    width: '75vw',
    height: '75vh',
    margin: '15px',
    padding: '20px',
  };
  const chatBoxStyling = {
    width: '35vw',
    position: 'sticky',
    top: '15px',
    margin: '5px',
  };

  return (
    <Layout>
      <br></br>
      <br></br>
      {isInLobby ? (
        <Box sx={outerBoxStyling}>
          <Box sx={interfaceBoxStyling}>{isHost ? <HostInterface /> : <PlayerInterface />}</Box>
          <br />
          <br />
          <br />
          <br />
          <Box sx={chatBoxStyling}>
            <ChatInterface />
          </Box>
        </Box>
      ) : (
        <LobbyInterFace />
      )}
      <br></br>
    </Layout>
  );
}

export default App;
