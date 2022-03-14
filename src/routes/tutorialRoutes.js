const express = require('express');
const {
  allUserTutorials,
  getAllTutorials,
  insertTutorial,
} = require('../controller/tutorialController');
const { validateToken, validateTokenAllTutorials } = require('../middleware');

const tutorialRoutes = express.Router();

tutorialRoutes.get('/tutorials', validateTokenAllTutorials, getAllTutorials);
tutorialRoutes.post('/tutorials', validateToken, insertTutorial);
tutorialRoutes.get('/user-tutorials/:id', validateToken, allUserTutorials);

module.exports = tutorialRoutes;
