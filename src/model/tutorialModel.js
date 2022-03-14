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

async function getAllTutorialsFromDb() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT * FROM tutorials`;
    const [result] = await connection.query(sql);
    await connection.close();
    return result;
  } catch (error) {
    console.log('getAllTutorialsFromDb===', error);
  }
}

async function insertTutorialToDb(data) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `INSERT INTO tutorials (user_id, title, content) VALUES (?, ?, ?) `;
    const { user_id, title, content } = data;
    const [result] = await connection.execute(sql, [user_id, title, content]);
    await connection.close();
    return result;
  } catch (error) {
    console.log('insertTutorialToDb ===', error);
  }
}

module.exports = {
  getTutorialByUserIdFromDb,
  getAllTutorialsFromDb,
  insertTutorialToDb,
};
