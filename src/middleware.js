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

  if (!tokenGotFromUser) return res.status(401).json('token not found');

  const verifyResult = verifyJwtToken(tokenGotFromUser);

  if (verifyResult === false) return  failResponce(res, 'invalid token');
  console.log('verifyResult ===', verifyResult);
  next();
}

module.exports = {
  validateUser,
  validateToken,
};
