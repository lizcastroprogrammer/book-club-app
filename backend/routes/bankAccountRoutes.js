const express = require("express");
const router = express.Router();
const {
  getBankAccounts,
  setBankAccount,
  updateBankAccount,
  deleteBankAccount,
  depositMoney,
} = require("../controllers/bankAccountController");
const { hasAdminRole } = require("../middleware/adminMiddleware");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, hasAdminRole, getBankAccounts)
  .post(protect, hasAdminRole, setBankAccount);

router.route("/:id/deposit").post(protect, depositMoney);
router
  .route("/:id")
  .delete(protect, deleteBankAccount)
  .put(protect, updateBankAccount);

module.exports = router;
