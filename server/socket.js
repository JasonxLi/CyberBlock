const mysql_queries = require("./mysql_queries");

module.exports = {

    handleEvents: function (socket, app, io, db_connection) {

        socket.on("host_create_lobby", ({ nbOfTeams, nbOfRounds, nbOfDefenses, timeForEachRound, hasTriviaRound, difficulty }, ack) => {
            const lobbyId = Math.ceil(Math.random() * 10000).toString();

            //initialize lobby
            app.locals.lobbyId = {};
            app.locals.lobbyId.host = socket.id;

            //store lobby configuration info
            app.locals.lobbyId.nbOfTeams = nbOfTeams;
            app.locals.lobbyId.nbOfRounds = nbOfRounds;
            app.locals.lobbyId.nbOfDefenses = nbOfDefenses;
            app.locals.lobbyId.timeForEachRound = timeForEachRound;
            app.locals.lobbyId.hasTriviaRound = hasTriviaRound;
            app.locals.lobbyId.difficulty = difficulty;

            //initialize team arrays
            app.locals.lobbyId.teamsInfo = [];
            for (i = 0; i < nbOfTeams; i++) {
                app.locals.lobbyId.teamsInfo.push([]);
            }

            socket.join(lobbyId);
            console.log(`Host with socketID ${socket.id} joined lobby ${lobbyId}`);
            ack(lobbyId);
        })

        socket.on("student_join_lobby", ({ alias, lobbyId }, ack) => {
            //add student to a team with least members
            let nbOfMembers = 9999;
            let teamWithLeastMembers = null;
            for (i = app.locals.lobbyId.nbOfTeams - 1; i >= 0; i--) {
                if(app.locals.lobbyId.teamsInfo[i].length <= nbOfMembers){
                    nbOfMembers = app.locals.lobbyId.teamsInfo[i].length;
                    teamWithLeastMembers = i;
                }
            }
            app.locals.lobbyId.teamsInfo[teamWithLeastMembers].push({socketId:socket.id, alias: alias});

            socket.join(lobbyId);
            console.log(`User with ID ${socket.id} joined lobby ${lobbyId}`)

            ack({
                nbOfTeams: app.locals.lobbyId.nbOfTeams,
                nbOfRounds: app.locals.lobbyId.nbOfRounds,
                nbOfDefenses: app.locals.lobbyId.nbOfDefenses,
                timeForEachRound: app.locals.lobbyId.timeForEachRound,
                hasTriviaRound: app.locals.lobbyId.hasTriviaRound,
                difficulty: app.locals.lobbyId.difficulty,
                teamsInfo: app.locals.lobbyId.teamsInfo
            });
        })

        socket.on("host_start_game", lobbyId => {
            //TODO: add each team to their own socket room
        })


        // --------------------old socket events-------------------- //
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
            const attack = await mysql_queries.rollAttack(db_connection, 1);
            io.in(lobbyId).emit("receive_roll", attack);
        })

        socket.on("start_buy_phase", async (lobbyId) => {
            const defenses = await mysql_queries.getDefenses(db_connection, 1);
            io.in(lobbyId).emit("receive_defense_cards", defenses);
            const points = await mysql_queries.getPoints(db_connection, 1);
            io.in(lobbyId).emit("receive_point_table", points);
        })
        // --------------------old socket events-------------------- //

    }
};


