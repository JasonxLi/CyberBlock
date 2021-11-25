const mysql_queries = require("./mysql_queries");

module.exports = {

    handleEvents: function (io, socket, connection) {

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


        socket.on("roll", async (lobbyId) => {
            const attack = await mysql_queries.rollAttack(connection, 1);
            io.in(lobbyId).emit("receive_roll", attack);
        })

        socket.on("start_buy_phase", async (lobbyId) => {
            const defenses = await mysql_queries.getDefenses(connection, 1);
            io.in(lobbyId).emit("receive_defense_cards", defenses);
            const points = await mysql_queries.getPoints(connection, 1);
            io.in(lobbyId).emit("receive_point_table", points); 
        })
        
    }
};


