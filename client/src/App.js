import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';
import {Button, Input, Box, Typography, Card} from '@material-ui/core'
import Layout from './components/Layout';
import { withStyles } from '@material-ui/styles';
import HostInterFace from './components/HostInterface/HostInterface';
import PlayerInterface from './components/PlayerInterface/PlayerInterface'

const socket = io.connect("http://localhost:3001");

function App() {
  const [isInLobby, setIsInLobby] = useState(false);
  const [lobbyId, setLobbyId] = useState("");
  const [isHost, setIsHost] = useState(false);
  const [rolledAttack, setRolledAttack] = useState("");

  useEffect(() => {
    socket.on("create_lobby", (lobbyId) => {
      setLobbyId(lobbyId);
      setIsHost(true);
      console.log(`lobby id is ${lobbyId}`);
    })

    socket.on("receive_roll", (attack) => {
      setRolledAttack(attack);
      console.log(attack);
    })
  }, [socket])

  const createLobby = () => {
    socket.emit("create_lobby");
    setIsInLobby(true);
  }

  const joinLobby = () => {
    if (lobbyId !== "") {
      socket.emit("join_lobby", lobbyId);
      setIsInLobby(true);
    }
  }

  const roll = (lobbyId) => {
    socket.emit("roll", lobbyId);
  }

  const boxStyling ={
    p:6,
    border: '1px solid black',
    borderRadius:'10px',
    minWidth:'85%'
  }
  const TitleText = withStyles({
    root: {
      fontWeight:600,
      color: '#088F8F',
      
    }
  })(Typography);



  return (
    <Layout minHeight='100vh'>
    <div className="App" >
    <Box align='center' pl='40px' >
    <TitleText variant='h4' > CYBERBLOCK</ TitleText>
    </Box>
    <br></br>
    <br></br>
      {!isInLobby
        ?
        <Box sx={boxStyling}>
          <Button variant="contained" onClick={() => createLobby()}>Create a Lobby</Button>
          <h4>or</h4>

          <Input type="text" placeholder="Enter Lobby ID" onChange={(event) => setLobbyId(event.target.value)} />
          <br></br>
          <br></br>
          <Button  variant="contained" onClick={() => joinLobby()}>Join a Lobby</Button>
        </Box>
        :
        isHost
          ?
          <Box sx={boxStyling}>
            <Button  variant="contained"onClick={() => roll(lobbyId)}>Roll an Attack</Button>
            <br></br>
            <br></br>
           <Typography>{`Lobby created, use code ${lobbyId} to join.`}</Typography>
            <br></br>
            <br></br>
            {rolledAttack !== "" && <Typography>
              {`You rolled ${rolledAttack}`}
              <br></br>
              <br></br>
              <HostInterFace/>
            </Typography>}
          </Box>
          :
          rolledAttack !== "" && <Typography>{`Host rolled ${rolledAttack}`} <PlayerInterface /></Typography>
          }
          
       
    </div>
    </Layout>
  );
}

export default App;
