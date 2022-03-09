const { failResponce, successResponce } = require('../dbHelpers');
const { hashPass, verifyHash, generateJwtToken } = require('../helpers');
const { addUserToDb, getUserFromDb } = require('../model/model');

async function authController(req, res) {
  const { email, password } = req.body;
  console.log('req.body ===', req.body);

  const hashedPassword = hashPass(password);
  //   res.json({ hashedPassword });

  const insertUser = await addUserToDb(email, hashedPassword);
  if (insertUser === false) {
    failResponce(res);
    return;
  }
  successResponce(res, 'New user created!');
}

async function loginController(req, res) {
  const { email, password } = req.body;

  const findResults = await getUserFromDb(email);

  if (findResults === false) return failResponce(res, 'something went wrong');
  if (!findResults.length) return failResponce(res, 'email or pass not mach 1');
  
  const foundUserObj = findResults[0];

  if (!verifyHash(password, foundUserObj)) {
    return failResponce(res, 'pass dont match');
  }

  const token = generateJwtToken(foundUserObj);

  //   successResponce(res, 'password match');
  successResponce(res, token);
}

module.exports = {
  authController,
  loginController,
};
