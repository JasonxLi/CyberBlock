import React, { createContext, useState, useEffect } from 'react';

import io from 'socket.io-client'
//establishes a socket io connection to the server
const socket = io.connect("http://localhost:3001");

export const Context = createContext({});

const ThemeContextProvider = ({ children }) => {

    // state that holds the user selected defense in the buying phase
    const [selectedDefenses, setSelectedDefenses] = useState([]);
    // a stae to end the buying phase and move to the next interface
    const [endBuyPhase, setEndBuyPhase] = useState(false);
    // a state that handles user earning in the buying state
    const [userEarnings, setUserEarnings] = useState(30);
    //state that hold the lobbyId created by the host
    const [lobbyId, setLobbyId] = useState("");
    //state that holds the attack rolled by the host
    const [rolledAttack, setRolledAttack] = useState("");
    //a state that holds the alias of each player that joined
    const [alias, setAlias] = useState("");
    // a state to see if users are in the set lobby or not
    const [isInLobby, setIsInLobby] = useState(false);
    // a state that decides whether a player is host or student ans puts them in a correct interface
    const [isHost, setIsHost] = useState(false);
    //a state to change the interface to buying interface
    const [inBuyingPhase, setBuyingPhase] = useState(false);
    // a state to store all the user defense obtained from the database
    const [userDefenses, setUserDefenses] = useState([]);
    //a sate to store all the point table from the dtatbase
    const [pointTable, setPointTable] = useState([]);
    //a state to store the number of rounds configured by the host
    const [nbOfRounds, setNbOfRounds] = useState(0);
    // a state to store all team information once student joins and host moves the players
    const [teamInfo, setTeamInfo] = useState([]);
    // a state to store all the current Leader from each team
    const [currentLead, setCurrentLead,] = useState([]);
    // a state to store the current round in the game
    const [roundCount, setRoundCount] = useState(0);
    // a state to change the interface to displayer all the team info to students
    const[showPlayerPhase, setShowPlayerPhase]=useState(false)
    //a state to hold trivia questions
    const [triviaQuestion, setTriviaQuestion] = useState();
    
    const [triviaAnswer, setTriviaAnswer] = useState();
    //a state to hold the selected trivia answers
    const [submittedTriviaAnswer, setSubmittedTriviaAnswer] = useState(false);
    //a state to hold the correct trivia answers
    const [correctTriviaAnswer, setCorrectTriviaAnswer] = useState();
    //a state to hold points for each team
    const [points, setPoints] = useState([0])
    //state to store current leader index
    

    //recalls all the socket events each time the socket changes to retrive the infromation from the server
    useEffect(() => {
        socket.on("new_student_joined_lobby", (info) => {
            setTeamInfo(info)
        })
        socket.on("host_moved_student", (info) => {
            setTeamInfo(info)

        })

        socket.on("host_ended_trivia_round", () => {
            setBuyingPhase(true);
        })

        socket.on("student_receives_trivia_question", (triviaQuestion) => {
            setTriviaQuestion(triviaQuestion);
            setSubmittedTriviaAnswer(false);

        })

        socket.on("receive_roll", (attack) => {
            setRolledAttack(attack);
        })
        socket.on("receive_defense_cards", (defenses) => {
            setUserDefenses(defenses);
            setBuyingPhase(true)
           
        })
        //listening to receive the pointTable from the server
        socket.on("obtained_point_table", (points) => {
            setPointTable(points)
            
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
            setShowPlayerPhase(true)
        }
    }

    const host_create_lobby = (nbOfTeams, nbOfRounds, nbOfDefenses, timeForEachRound, hasTriviaRound, difficulty) => {
        socket.emit("host_create_lobby", { nbOfTeams, nbOfRounds, nbOfDefenses, timeForEachRound, hasTriviaRound, difficulty }, lobbyId => {
            setLobbyId(lobbyId);
            setIsHost(true);
            setIsInLobby(true);
        })
    }

    const host_gets_trivia_question = () => {
        socket.emit("host_gets_trivia_question", lobbyId, (newTriviaQuestion) => {
            setTriviaQuestion(newTriviaQuestion);
        })
    }

    const host_ends_trivia_round = () => {
        socket.emit("host_ends_trivia_round", lobbyId);
    }

    const student_submit_trivia_answer = () => {
        socket.emit("student_submit_trivia_answer", { lobbyId, triviaAnswer }, ({ triviaReward, correctAnswer }) => {
            setUserEarnings(userEarnings + triviaReward);
            setCorrectTriviaAnswer(correctAnswer);
        });
    }

    const roll = (lobbyId) => {
        socket.emit("roll", lobbyId);
    }

    const start_buy_phase = () => {
        socket.emit("start_buy_phase", lobbyId)   
    }
    // event sent to server to ask points table from the server
    const receive_point_table = () => {
        socket.emit("receive_point_table", lobbyId)   
    }

    // function to get all the teamleaders from the team
    const getLead =() =>{
        var playerIndex = 0;
        //to get the round number when the team leader needs to be switched
        
        // state to change the leader when the required round numer hits
        
            // a copy of the state arru=y to add the new team lead in the index corresponding to the team 
            const tempLeader = [...currentLead];
            teamInfo.map((team, index) => {
                const leadSwitch = nbOfRounds / team.length
                if (roundCount % Math.ceil(leadSwitch) === 0) {
                let tempLeaderIndex = { ...tempLeader[index] }
                tempLeaderIndex = team[playerIndex].socketId
                tempLeader[index] = tempLeaderIndex
                setCurrentLead(tempLeader)
            }})
            // increasing the player index to retrive the next team lead
            playerIndex++
        

    }

    // providing access to these value to all the interfaces
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
                getLead,
                showPlayerPhase, 
                setShowPlayerPhase,
                host_gets_trivia_question,
                host_ends_trivia_round,
                triviaQuestion,
                triviaAnswer,
                setTriviaAnswer,
                student_submit_trivia_answer,
                submittedTriviaAnswer,
                setSubmittedTriviaAnswer,
                correctTriviaAnswer,
                setCorrectTriviaAnswer,
                points, 
                setPoints,
                receive_point_table
            }}
        >
            {children}
        </Context.Provider>
    )

}
export default ThemeContextProvider;