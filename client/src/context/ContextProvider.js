import React, { createContext, useState, useEffect } from 'react';

import io from 'socket.io-client'
const socket = io.connect("https://cyberblock.herokuapp.com/");

export const Context = createContext({});

const ThemeContextProvider = ({ children }) => {
    const [selectedDefenses, setSelectedDefenses] = useState([]);
    const [endBuyPhase, setEndBuyPhase] = useState(false);
    const [userEarnings, setUserEarnings] = useState(30);
    const [lobbyId, setLobbyId] = useState("");
    const [rolledAttack, setRolledAttack] = useState("");
    const [alias, setAlias] = useState("");
    const [isInLobby, setIsInLobby] = useState(false);

    const [isHost, setIsHost] = useState(false);
    const [inBuyingPhase, setBuyingPhase] = useState(false);
    const [userDefenses, setUserDefenses] = useState([]);
    const [pointTable, setPointTable] = useState([]);
    const [nbOfRounds, setNbOfRounds] = useState(0);

    const [teamInfo, setTeamInfo] = useState([]);
    const [currentLead, setCurrentLead,] = useState([]);

    const [roundCount, setRoundCount] = useState(0);

    useEffect(() => {
        socket.on("new_student_joined_lobby", (info) => {
            setTeamInfo(info)
        })
        socket.on("host_moved_student", (info) => {
            setTeamInfo(info)

        })

        socket.on("receive_roll", (attack) => {
            setRolledAttack(attack);
        })
        socket.on("receive_defense_cards", (defenses) => {
            setUserDefenses(defenses);
            setBuyingPhase(true)

        })
    }, [socket])

    const host_move_student = (lobbyId, socketId, oldTeamId, newTeamId) => {
        socket.emit("host_move_student", { lobbyId, socketId, oldTeamId, newTeamId });
    }

    const student_join_lobby = () => {
        if (lobbyId !== "" && alias !== "") {
            socket.emit("student_join_lobby", { lobbyId, alias }, result => {
            })
            setIsInLobby(true)
        }
    }

    const host_create_lobby = (nbOfTeams, nbOfRounds, nbOfDefenses, timeForEachRound, hasTriviaRound, difficulty) => {
        socket.emit("host_create_lobby", { nbOfTeams, nbOfRounds, nbOfDefenses, timeForEachRound, hasTriviaRound, difficulty }, lobbyId => {
            setLobbyId(lobbyId);
            setIsHost(true);
            setIsInLobby(true);
        })
    }

    const roll = (lobbyId) => {
        socket.emit("roll", lobbyId);
    }

    const start_buy_phase = () => {
        socket.emit("start_buy_phase", lobbyId)
    }
    socket.on("receive_point_table", (points) => {
        setPointTable(points);
    })

    return (
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
                setRolledAttack,
                isInLobby,
                setIsInLobby,
                isHost,
                setIsHost,
                inBuyingPhase,
                userDefenses,
                pointTable,
                host_create_lobby,
                student_join_lobby,
                nbOfRounds,
                setNbOfRounds,
                host_create_lobby,
                setAlias,
                alias,
                teamInfo,
                setTeamInfo,
                host_move_student,
                currentLead,
                setCurrentLead,
                roundCount,
                setRoundCount,
            }}
        >
            {children}
        </Context.Provider>
    )

}
export default ThemeContextProvider;