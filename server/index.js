const express = require('express');
const path = require('path');
const app = express();
const http = require('http');
const cors = require('cors');
const mysql = require('mysql');
const { Server } = require('socket.io');
const cb_socket = require("./socket");
const db_config = require("./db_config"); 

const PORT = process.env.PORT || 3001;

const connection = mysql.createPool({
    host: db_config.host,
    user: db_config.user,
    password: db_config.password,
    database: db_config.database
})

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

    cb_socket.handleEvents(io, socket, connection);

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