const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  getAll,
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const { hasAdminRole } = require("../middleware/adminMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/all", protect, hasAdminRole, getAll);

module.exports = router;
