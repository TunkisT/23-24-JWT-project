const { successResponce, failResponce } = require('../dbHelpers');
const {
  getTutorialByUserIdFromDb,
  getAllTutorialsFromDb,
  insertTutorialToDb,
  getAllPublicTutorialsFromDb,
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
  console.log('req.validUser ===', req.validUser);
  let allTutorials;
  if (req.validUser === true) {
    console.log('visi tutorial');
    allTutorials = await getAllTutorialsFromDb();
    return
  } else {
    console.log('public tutorial');
    allTutorials = await getAllPublicTutorialsFromDb()
  }

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
  insertTutorial,
};
