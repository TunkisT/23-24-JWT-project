const mysql = require('mysql2/promise');
const dbConfig = require('../dbConfig');

async function addUserToDb(email, passHash) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = 'INSERT INTO users (email , password) VALUES (?, ?)';

    const { result } = await connection.execute(sql, [email, passHash]);
    await connection.close();
    return result;
  } catch (error) {
    console.log('addUserToDb ===', error);
    return false;
  }
}

async function getUserFromDb(email) {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM users WHERE email = ?';

    const [userFoundResult] = await connection.execute(sql, [email]);
    await connection.close();
    return userFoundResult;
  } catch (error) {
    console.log('getUserFromDb ===', error);
    return false;
  }
}

async function getAllArticlesFromDb() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = 'SELECT * FROM article';
    const [result] = await connection.query(sql);
    await connection.close();
    return result;
  } catch (error) {
    console.log('getAllUsersFromDb ===', error);
    return false;
  }
}

async function countUsersFromDb() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const sql = `SELECT COUNT(*) FROM users`;
    const  [result]  = await connection.query(sql);
    await connection.close();
    return result;
  } catch (error) {
    console.log('countUsersFromDb ===', error);
  }
}

module.exports = {
  addUserToDb,
  getUserFromDb,
  getAllArticlesFromDb,
  countUsersFromDb,
};
