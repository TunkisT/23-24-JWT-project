const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function getTutorialByUserIdFromDb(id) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM tutorials WHERE user_id = ?`;
    const [result] = await connection.execute(sql, [id]);
    await connection.close();
    return result;
  } catch (error) {
    console.log('countUsersFromDb ===', error);
  }
}
module.exports = {
  getTutorialByUserIdFromDb,
};
