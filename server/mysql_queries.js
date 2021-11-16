module.exports = {
    rollAttack: function (connection) {
        const rolledNum = Math.floor(Math.random() * 11 + 2);
        connection.query(`SELECT attack.AttackID, attack.Name, attack.Description FROM attack WHERE RollValue = ${rolledNum} AND Difficulty = 1`, async (error, rows)=>{
            if(error) throw error;
            if(!error) {
                console.log(`log from query file ${rows[0].Name}`);
                let attack =  await rows[0].Name;
                return attack;
            }
        })
    }
}
