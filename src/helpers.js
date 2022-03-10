const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.JWT_TOKEN_SECRET;

function hashPass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function verifyHash(enteredPassword, userObj) {
  return bcrypt.compareSync(enteredPassword, userObj.password);
}

function generateJwtToken(userObj) {
  return jwt.sign({ id: userObj.id }, jwtSecret, { expiresIn: '1h' });
}

function verifyJwtToken(token) {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    console.log('error ===', error);
    return false;
  }
}

module.exports = {
  hashPass,
  verifyHash,
  generateJwtToken,
  verifyJwtToken,
};
