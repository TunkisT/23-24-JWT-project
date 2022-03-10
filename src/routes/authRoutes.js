const express = require('express');
const {
  authController,
  loginController,
  findAllArticles,
} = require('../controller/controller');
const { validateUser, validateToken } = require('../middleware');

const authRoutes = express.Router();

authRoutes.post('/register', validateUser, authController);
authRoutes.post('/login', validateUser, loginController);
authRoutes.get('/articles', validateToken, findAllArticles);

module.exports = authRoutes;
