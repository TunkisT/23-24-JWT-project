const express = require('express');
const {
  authController,
  loginController,
  findAllArticles,
} = require('../controller/controller');

const authRoutes = express.Router();

authRoutes.post('/register', authController);
authRoutes.post('/login', loginController);
authRoutes.get('/articles', findAllArticles);

module.exports = authRoutes;
