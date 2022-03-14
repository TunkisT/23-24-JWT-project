const { failResponce, successResponce } = require('../dbHelpers');
const { hashPass, verifyHash, generateJwtToken } = require('../helpers');
const {
  addUserToDb,
  getUserFromDb,
  getAllArticlesFromDb,
  countUsersFromDb,
} = require('../model/model');

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

async function countUsers(req, res) {
  const allUsersNumber = await countUsersFromDb();
  if (allUsersNumber === false) {
    failResponce(res);
    return;
  }
  successResponce(res, allUsersNumber)
}

module.exports = {
  authController,
  loginController,
  findAllArticles,
  countUsers,
};
