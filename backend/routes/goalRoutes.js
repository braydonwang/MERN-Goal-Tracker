const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updatetGoal,
  deleteGoal,
} = require("../controllers/goalController");

router.route("/").get(getGoals).post(setGoal);
router.route("/:id").delete(deleteGoal).put(updatetGoal);

module.exports = router;
