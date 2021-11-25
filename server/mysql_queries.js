module.exports = {
    rollAttack: function (connection, difficulty) {
        return new Promise(function(resolve, reject) {
            const rolledNum = Math.floor(Math.random() * 11 + 2);
            connection.query(`SELECT attack.AttackID, attack.Name, attack.Description FROM attack WHERE RollValue = ${rolledNum} AND Difficulty = ${difficulty}`, function (err, rows) {
                if (err) {
                    return reject(err);
                }
                resolve(rows[0]);
            });
        });
    },
    getDefenses: function (connection, difficulty){
        return new Promise(function(resolve, reject) {
            connection.query(`SELECT * FROM defense`, function (err, defenses) {
                if (err) {
                    return reject(err);
                }
                resolve(defenses);
            });
        });
    },
    getPoints: function (connection, difficulty){
        return new Promise(function(resolve, reject) {
            connection.query(`SELECT * FROM points`, function (err, points) {
                if (err) {
                    return reject(err);
                }
                resolve(points);
            });
        });
    }
}
