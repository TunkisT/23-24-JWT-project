const express = require('express');
const { authController } = require('../controller/controller');

const authRoutes = express.Router();

authRoutes.post('/register', authController);

module.exports = authRoutes;
