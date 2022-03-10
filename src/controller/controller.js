const jwt = require('jsonwebtoken');
const { failResponce, successResponce } = require('../dbHelpers');
const { hashPass, verifyHash, generateJwtToken } = require('../helpers');
const {
  addUserToDb,
  getUserFromDb,
  getAllArticlesFromDb,
} = require('../model/model');
require('dotenv').config();

const jwtSecret = process.env.JWT_TOKEN_SECRET;

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

async function findAllArticles(req, res) {
  const allArticles = await getAllArticlesFromDb();
  if (allArticles === false) {
    failResponce(res);
    return;
  }
  // successResponce(res, 'All Articles found!');
  res.json(allArticles);
}

async function validateUser(req, res) {
  const authHeaders = req.headers.authorization;
  res.json(authHeaders);

  const tokenGotFromUser = authHeaders && authHeaders.split(' ')[1];
  console.log('tokenGotFromUser ===', tokenGotFromUser);

  if (!tokenGotFromUser) return res.status(401).json('token not found');

  jwt.verify(tokenGotFromUser, jwtSecret, (err, verifiedJwt) => {
    if (err) {
      res.send(err.message);
    } else {
      res.send(verifiedJwt);
    }
    // next();
  });
}

module.exports = {
  authController,
  loginController,
  findAllArticles,
  validateUser,
};
