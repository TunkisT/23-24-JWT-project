const express = require('express');
const {
  authController,
  loginController,
  findAllArticles,
  validateUser,
} = require('../controller/controller');

const authRoutes = express.Router();

authRoutes.post('/register', authController);
authRoutes.post('/login', loginController);
authRoutes.get('/articles', findAllArticles);
authRoutes.post('/validate', validateUser);

module.exports = authRoutes;
