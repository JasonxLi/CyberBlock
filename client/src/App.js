import './App.css';
import io from 'socket.io-client'
import { useEffect, useState } from 'react';

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

  return (
    <div className="App">
      {!isInLobby
        ?
        <div>
          <button onClick={() => createLobby()}>Create a Lobby</button>
          <h4>or</h4>

          <input type="text" placeholder="Enter Lobby ID" onChange={(event) => setLobbyId(event.target.value)} />
          <button onClick={() => joinLobby()}>Join a Lobby</button>
        </div>
        :
        isHost
          ?
          <div>
            <button onClick={() => roll(lobbyId)}>Roll an Attack</button>
            <div>{`Lobby created, use code ${lobbyId} to join.`}</div>
            {rolledAttack !== "" && <div>
              {`You rolled ${rolledAttack}`}
            </div>}
          </div>
          :
          rolledAttack !== "" && <div>{`Host rolled ${rolledAttack}`}</div>}
    </div>
  );
}

export default App;
