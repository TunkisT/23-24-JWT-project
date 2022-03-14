const { successResponce, failResponce } = require('../dbHelpers');
const {
  getTutorialByUserIdFromDb,
  getAllTutorialsFromDb,
  insertTutorialToDb,
} = require('../model/tutorialModel');

async function allUserTutorials(req, res) {
  const { id } = req.params;
  const userTutorial = await getTutorialByUserIdFromDb(id);
  if (userTutorial === false) {
    failResponce(res);
    return;
  }
  successResponce(res, userTutorial);
}

async function getAllTutorials(req, res) {
  const allTutorials = await getAllTutorialsFromDb();
  if (allTutorials === false) {
    failResponce(res);
    return;
  }
  successResponce(res, allTutorials);
}

async function insertTutorial(req, res) {
  const data = req.body;
  const insert = await insertTutorialToDb(data);
  if (insert === false) {
    failResponce(res);
    return;
  }
  successResponce(res, 'Tutorial inserted!');
}

module.exports = {
  allUserTutorials,
  getAllTutorials,
  insertTutorial
};
