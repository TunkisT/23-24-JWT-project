const { successResponce, failResponce } = require('../dbHelpers');
const { getTutorialByUserIdFromDb } = require('../model/tutorialModel');

async function allUserTutorials(req, res) {
  const { id } = req.params;
  const userTutorial = await getTutorialByUserIdFromDb(id);
  if (userTutorial === false) {
    failResponce(res);
    return;
  }
  successResponce(res, userTutorial);
}
module.exports = {
  allUserTutorials,
};
