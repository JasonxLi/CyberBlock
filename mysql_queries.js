module.exports = {
	getNumberOfTriviaQuestions: function (connection) {
		return new Promise(function (resolve, reject) {
			connection.query(
				`SELECT COUNT(*) AS Count FROM wildcard`,
				function (err, number) {
					if (err) {
						return reject(err);
					}
					resolve(number[0]);
				}
			);
		});
	},
	getTriviaQuestion: function (connection, triviaID) {
		return new Promise(function (resolve, reject) {
			connection.query(
				`SELECT wildcard.Question, wildcard.Option1, wildcard.Option2, wildcard.Option3, wildcard.Option4, wildcard.Answer FROM wildcard WHERE WildcardID = ${triviaID}`,
				function (err, trivia) {
					if (err) {
						return reject(err);
					}
					resolve(trivia[0]);
				}
			);
		});
	},
	getDefenses: function (connection, difficulty) {
		return new Promise(function (resolve, reject) {
			connection.query(
				`SELECT defense.DefenseID, defense.Name, defense.cost, defense.Description FROM defense WHERE defense.Difficulty <= ${difficulty}`,
				function (err, defenses) {
					if (err) {
						return reject(err);
					}
					resolve(defenses);
				}
			);
		});
	},
	getAttack: function (connection, difficulty) {
		return new Promise(function (resolve, reject) {
			connection.query(
				`SELECT attack.AttackID, attack.Name, attack.Description FROM attack WHERE attack.Difficulty <= ${difficulty} ORDER BY RAND() LIMIT 1`,
				function (err, attack) {
					if (err) {
						return reject(err);
					}
					resolve(attack[0]);
				}
			);
		});
	},
	getBestDefenses: function (connection, specificAttackID) {
		return new Promise(function (resolve, reject) {
			connection.query(
				`SELECT defense.DefenseID, defense.Name, defense.Description FROM defense JOIN points ON defense.DefenseID = points.Defense_ID WHERE points.Attack_ID = ${specificAttackID}`,
				function (err, bestDefenses) {
					if (err) {
						return reject(err);
					}
					resolve(bestDefenses);
				}
			);
		});
	},
	getPoints: function (connection, defenseID, attackID) {
		return new Promise(function (resolve, reject) {
			connection.query(
				`SELECT points.PointValue FROM points WHERE points.Attack_ID = ${attackID} AND points.Defense_ID = ${defenseID}`,
				function (err, point) {
					if (err) {
						return reject(err);
					}
					resolve(point);
				}
			);
		});
	},
};
