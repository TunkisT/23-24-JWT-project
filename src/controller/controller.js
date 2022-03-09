const { failResponce, successResponce } = require('../dbHelpers');
const { hashPass, verifyHash } = require('../helpers');
const { addUserToDb, getUserFromDb } = require('../model/model');
const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
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
  // console.log('findResults ===', findResults);
  if (!findResults.length) return failResponce(res, 'email or pass not mach 1');
  const foundUserObj = findResults[0];
  console.log('foundUserObj ===', foundUserObj.password);

  if (!verifyHash(password, foundUserObj)) {
    return failResponce(res, 'pass dont match');
  }

  successResponce(res, 'password match');
}

module.exports = {
  authController,
  loginController,
};
