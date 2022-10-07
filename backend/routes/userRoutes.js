const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getAll,
} = require("../controllers/userController");
const { decorateUserObject } = require("../middleware/authMiddleware");
const { hasAdminRole } = require("../middleware/adminMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", decorateUserObject, getMe);
router.get("/all", decorateUserObject, hasAdminRole, getAll);

module.exports = router;
