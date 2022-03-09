const bcrypt = require('bcryptjs');

function hashPass(plainPassword) {
  return bcrypt.hashSync(plainPassword, 10);
}

module.exports = {
  hashPass,
};
