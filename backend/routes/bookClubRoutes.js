const express = require("express");
const router = express.Router();
const {
  getBookClubs,
  setBookClub,
  updateBookClub,
  deleteBookClub,
  comment,
} = require("../controllers/bookClubController");
const { hasAdminRole } = require("../middleware/adminMiddleware");

const { decorateUserObject } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(decorateUserObject, getBookClubs)
  .post(decorateUserObject, hasAdminRole, setBookClub);

router.route("/:id/deposit").post(decorateUserObject, comment);
router
  .route("/:id")
  .delete(decorateUserObject, deleteBookClub)
  .put(decorateUserObject, updateBookClub);

module.exports = router;
