const express = require('express');
const { allUserTutorials } = require('../controller/tutorialController');

const tutorialRoutes = express.Router();

tutorialRoutes.get('/user-tutorials/:id', allUserTutorials);

module.exports = tutorialRoutes;
