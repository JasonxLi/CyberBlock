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


        socket.on("roll", (lobbyId) => {
            const rolledNum = Math.floor(Math.random() * 11 + 2);
            connection.query(`SELECT attack.AttackID, attack.Name, attack.Description FROM attack WHERE RollValue = ${rolledNum} AND Difficulty = 1`, async (error, rows) => {
                if (error) throw error;
                if (!error) {
                    io.in(lobbyId).emit("receive_roll", rows[0].Name);
                }
            })
        })


        socket.on("start_buy_phase", (lobbyId) => {
            var defenses = [
                {
                    label: "Traceable Supply Chain",
                    cost: 6
                },
                {
                    label: "Certified Suppliers",
                    cost: 5
                },
                {
                    label: "Data Encryption",
                    cost: 8
                },
                {
                    label: "Read-Only Software",
                    cost: 8
                },
                {
                    label: "Updatable Device",
                    cost: 7
                },
                {
                    label: "Two factor Authentication",
                    cost: 8
                },
                {
                    label: "Connectivity Checker",
                    cost: 6
                },
            ]

            io.in(lobbyId).emit("receive_defense_cards", defenses);
        })
    }
};


