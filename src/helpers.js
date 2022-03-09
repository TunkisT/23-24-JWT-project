const bcrypt = require('bcryptjs');

function hashPass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

function verifyHash(enteredPassword, userObj) {
  return bcrypt.compareSync(enteredPassword, userObj.password);
}

module.exports = {
  hashPass,
  verifyHash,
};
