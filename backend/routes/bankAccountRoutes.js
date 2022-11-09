// const express = require("express");
// const router = express.Router();
// const {
//   getBankAccounts,
//   setBankAccount,
//   updateBankAccount,
//   deleteBankAccount,
//   depositMoney,
// } = require("../controllers/bankAccountController");
// const { hasAdminRole } = require("../middleware/adminMiddleware");

// const { decorateUserObject } = require("../middleware/authMiddleware");

// router
//   .route("/")
//   .get(decorateUserObject, getBankAccounts)
//   .post(decorateUserObject, hasAdminRole, setBankAccount);

// router.route("/:id/deposit").post(decorateUserObject, depositMoney);
// router
//   .route("/:id")
//   .delete(decorateUserObject, deleteBankAccount)
//   .put(decorateUserObject, updateBankAccount);

// module.exports = router;
