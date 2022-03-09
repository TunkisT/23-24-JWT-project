const { failResponce, successResponce } = require('../dbHelpers');
const { hashPass } = require('../helpers');
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

  const userObjFound = await getUserFromDb(email);

  if (!userObjFound.length)
    return failResponce(res, 'email or password not match');

  //   if (bcrypt.compareSync(password, userObjFound.password) && userObjFound) {
  //     const loggedInUserObj = { email };
  //     const token = jwt.sign(loggedInUserObj, jwtSecret, { expiresIn: '1h' });
  //     console.log('token ===', token);
  //     res.json({
  //       success: true,
  //       msg: `Login successful. Hello ${email}`,
  //       token,
  //     });
  //   } else {
  //     res.status(400).json({
  //       success: false,
  //       errors: {
  //         message: 'password or username do not match',
  //       },
  //     });
  //   }

  if (userObjFound === false) {
    failResponce(res);
    return;
  }
  //   successResponce(res, 'You logged in!');
  successResponce(res, userObjFound);
}

module.exports = {
  authController,
  loginController,
};
