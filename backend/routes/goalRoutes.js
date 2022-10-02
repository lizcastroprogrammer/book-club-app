const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { decorateUserObject } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(decorateUserObject, getGoals)
  .post(decorateUserObject, setGoal);
router
  .route("/:id")
  .delete(decorateUserObject, deleteGoal)
  .put(decorateUserObject, updateGoal);

module.exports = router;
