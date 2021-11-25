import './App.css';
import io from 'socket.io-client'
import { useEffect, useState, useContext } from 'react';
import {Button, Input, Box, Typography} from '@material-ui/core'
import Layout from './components/Layout';
import { withStyles } from '@material-ui/styles';
import HostInterFace from './components/HostInterface/HostInterface';
import PlayerInterface from './components/PlayerInterface/PlayerInterface'
import { Context } from './context/ContextProvider';
import GameInterFace from './components/GameInterFace/GameInterFace';

const socket = io.connect("http://localhost:3001");

function App() {
  const [isInLobby, setIsInLobby] = useState(false);
  
  const [isHost, setIsHost] = useState(false);
  const [inBuyingPhase, setBuyingPhase] = useState(false);
  const [userDefenses, setUserDefenses] = useState([]);
  const [pointTable, setPointTable] = useState([]);
  
  const {endBuyPhase,lobbyId,setLobbyId, rolledAttack,setRolledAttack}=useContext(Context)

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
    socket.on("receive_defense_cards", (defenses) => {
      setUserDefenses(defenses);
      setBuyingPhase(true)
      console.log(defenses);
    })
  }, [socket])
  
  socket.on("receive_point_table", (points) => {
    setPointTable(points);
  })

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

  const boxStyling ={
    p:6,
    border: '1px solid black',
    borderRadius:'10px',
    width:250,
    align:'center',
    position:'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
   
  }
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
          <Box sx={boxStyling}>
            <Button variant="contained" onClick={() => createLobby()}>Create Lobby</Button>
            <h4>or</h4>

            <Input type="text" placeholder="Enter Lobby ID" onChange={(event) => setLobbyId(event.target.value)} />
            <br></br>
            <br></br>
            <Button  variant="contained" onClick={() => joinLobby()}>Join Lobby</Button>
          </Box>
          :
          isHost
            ?
            <HostInterFace />
            :
            <Box>{
              (inBuyingPhase && !endBuyPhase) ?
              
              <Typography >
              <PlayerInterface userDefenses={userDefenses}   /> </Typography>
              : 
              rolledAttack !== "" &&
              <GameInterFace rolledAttack={rolledAttack.Name} attackId={rolledAttack.AttackID} pointTable={pointTable}/> 
            }
           </Box>
        } 

    </Layout>
  );
}

export default App;