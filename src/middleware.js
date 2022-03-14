const Joi = require('joi');
const { failResponce } = require('./dbHelpers');
const { verifyJwtToken } = require('./helpers');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.JWT_TOKEN_SECRET;

async function validateUser(req, res, next) {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(50).required(),
  });

  try {
    await schema.validateAsync(req.body, { abortEarly: false });
    next();
  } catch (error) {
    console.log('validate user error', error);
    // failResponce(res, error);

    const formatedError = error.details.map((detail) => ({
      field: detail.context.key,
      message: detail.message,
    }));
    const responseToSend = {
      success: false,
      error: formatedError,
    };
    res.status(400).json(responseToSend);
  }
}

function validateToken(req, res, next) {
  const authHeaders = req.headers.authorization;
  const tokenGotFromUser = authHeaders && authHeaders.split(' ')[1];

  if (!tokenGotFromUser) return failResponce(res, 'no token', 401);
  const verifyResult = verifyJwtToken(tokenGotFromUser);

  if (verifyResult === false) return failResponce(res, 'invalid token', 403);
  console.log('req.id ===', req.userId);
  console.log('verifyResult ===', verifyResult);
  next();
}

function validateTokenAllTutorials(req, res, next) {
  const authHeaders = req.headers.authorization;
  const tokenGotFromUser = authHeaders && authHeaders.split(' ')[1];

  if (!tokenGotFromUser) return next();
  const verifyResult = verifyJwtToken(tokenGotFromUser);

  if (verifyResult === false) return next();
  // console.log('verifyResult ===', verifyResult);
  req.validUser = true;
  next();
}

module.exports = {
  validateUser,
  validateToken,
  validateTokenAllTutorials,
};
