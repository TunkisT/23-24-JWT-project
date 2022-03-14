const express = require('express');
const {
  allUserTutorials,
  getAllTutorials,
  insertTutorial,
} = require('../controller/tutorialController');

const tutorialRoutes = express.Router();

tutorialRoutes.get('/tutorials', getAllTutorials);
tutorialRoutes.post('/tutorials', insertTutorial);
tutorialRoutes.get('/user-tutorials/:id', allUserTutorials);

module.exports = tutorialRoutes;
