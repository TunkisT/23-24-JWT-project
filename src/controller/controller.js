const { hashPass } = require('../helpers');
const { addUserToDb } = require('../model/model');

async function authController(req, res) {
  const { email, password } = req.body;
  console.log('req.body ===', req.body);

  const hashedPassword = hashPass(password);
//   res.json({ hashedPassword });

  const insertUser = await addUserToDb(email, hashedPassword);
  if (insertUser === false) {
    res.status(500);
    return;
  }
  res.json('New user created!');
}

module.exports = {
  authController,
};
