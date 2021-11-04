const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3001;

app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
})

io.on("connection", (socket) => {
    console.log(`An user has connected, id is ${socket.id}`);

    socket.on("join_lobby", (lobbyId) => {
        socket.join(lobbyId);
        console.log(`User with ID ${socket.id} joined lobby ${lobbyId}`);
    })

    socket.on("create_lobby", () => {
        const lobbyId = Math.ceil(Math.random() * 10000).toString();
        socket.emit("create_lobby", lobbyId);
        socket.join(lobbyId);
        console.log(`User with ID ${socket.id} joined lobby ${lobbyId}`);
    })

    socket.on("roll", (lobbyId) => {
        const rolledNum = Math.floor(Math.random() * 6 + 1);
        var attack = "";
        if (rolledNum === 1) {
            attack = "Attack 1: Lost my device";
        }
        else if (rolledNum === 2) {
            attack = "Attack 2: Network compromised";
        }
        else if (rolledNum === 3) {
            attack = "Attack 3: Competitor Attack";
        }
        else if (rolledNum === 4) {
            attack = "Attack 4: Supply Chain Attack";
        }
        else if (rolledNum === 5) {
            attack = "Attack 5: Malware Attack";
        }
        else if (rolledNum === 6) {
            attack = "Attack 6: Cat Attack ლ(=ↀωↀ=)ლ";
        }
        console.log(`${attack}, ${lobbyId}`);
        io.in(lobbyId).emit("receive_roll", attack);
    })

    socket.on("start_buy_phase", (lobbyId) => {
        var defenses = {
            "Traceable Supply Chain" : 6, 
            "Certified Suppliers" : 5,
            "Data Encryption" : 8,
            "Read-Only Software" : 8,
            "Updatable Device" : 7,
            "Two factor Authentication": 8,
            "Connectivity Checker" : 6
        }
        io.in(lobbyId).emit("receive_defense_cards", defenses);
    })

    socket.on("disconnect", () => {
        console.log(`An user disconnected, id is ${socket.id}`);
    })
})

/*
only serve build folder for production

//specifying where files should be served
app.use(express.static(path.join(__dirname, 'build')));

//serve actual files
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

*/

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})