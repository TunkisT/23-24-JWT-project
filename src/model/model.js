const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function addUserToDb(email, passHash) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO users (email , password) VALUES (?, ?)`;

    const { result } = await connection.execute(sql, [email, passHash]);
    await connection.close();
    return result;
  } catch (error) {
    console.log('addUserToDb ===', error);
    return false;
  }
}

module.exports = {
  addUserToDb,
};
