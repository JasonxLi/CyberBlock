import React, { createContext,useState} from 'react';

import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001");

export const Context = createContext({});

const ThemeContextProvider = ({children}) => {
    const [selectedDefenses, setSelectedDefenses]=useState([]);
    const [endBuyPhase, setEndBuyPhase] = useState(false);
    const[userEarnings, setUserEarnings]= useState(30);
    const [lobbyId, setLobbyId] = useState("");
    const [rolledAttack, setRolledAttack] = useState("");

    const roll = (lobbyId) => {
        socket.emit("roll", lobbyId);
      }
    
      const start_buy_phase =() =>{
        socket.emit("start_buy_phase", lobbyId)
      }


    return(
        <Context.Provider
            value={{
                selectedDefenses,
                setSelectedDefenses,
                endBuyPhase,
                setEndBuyPhase,
                userEarnings,
                setUserEarnings,
                lobbyId, 
                setLobbyId,
                roll,
                start_buy_phase,
                rolledAttack,
                setRolledAttack
            }}
        >
            {children}
        </Context.Provider>
    )

}
export default ThemeContextProvider;