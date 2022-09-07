const express = require("express");
const router = express.Router();
const {
  home,
  createAccount,
  logIn,
  deposit,
  withdraw,
  balance,
  allData,
} = require("../controllers/homeController");

router.get("/", home);

router.post("/account/create/:name/:email/:password", createAccount);

router.get("/account/login/:email/:password", logIn);

router.put("/account/withdraw/:email/:amount", withdraw);

router.put("/account/deposit/:email/:amount", deposit);

router.get("/account/balance/:email", balance);

router.get("/accounts/all", allData);

router.delete("/:id", (req, res) => {
  res.status(200).json({ message: `Delete balance ${req.params.id}` });
});

module.exports = router;
