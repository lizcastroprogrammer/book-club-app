const asyncHandler = require("express-async-handler");

const BankAccount = require("../models/bankAccountModel");

// @desc    Get bank accounts
// @route   GET /api/bank-accounts
// @access  Private
const getBankAccounts = asyncHandler(async (req, res) => {
  if (req.user.roles === "member") {
    const bankAccounts = await BankAccount.find({
      user: req.user._id,
    }).populate("user", "id name balance");
    res.status(200).json(bankAccounts);
    return;
  } else if (req.user.roles === "admin") {
    const bankAccounts = await BankAccount.find({}).populate(
      "user",
      "id name balance"
    );
    res.status(200).json(bankAccounts);
    return;
  }
  res.status(400).json({ error: "Bad request" });
});

// @desc    Set bank account
// @route   POST /api/bank-accounts
// @access  Private
const setBankAccount = asyncHandler(async (req, res) => {
  if (!req.body.balance || !req.body.userId) {
    res.status(400);
    throw new Error("balance or userId is missing");
  }

  const bankAccount = await BankAccount.create({
    balance: Number(req.body.balance),
    user: req.body.userId,
  });

  res.status(200).json(bankAccount);
});

// @desc    Update bank account
// @route   PUT /api/bank-accounts/:id
// @access  Private
const updateBankAccount = asyncHandler(async (req, res) => {
  const bankAccount = await BankAccount.findById(req.params.id).populate(
    "user",
    "id name balance"
  );

  if (!bankAccount) {
    res.status(400);
    throw new Error("Bank account not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (bankAccount.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedBankAccount = await BankAccount.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedBankAccount);
});

// @desc   Deposit money to bank account
// @route   PUT /api/bank-accounts/:id/deposit
// @access  Private
const depositMoney = asyncHandler(async (req, res) => {
  try {
    const bankAccount = await BankAccount.findById(req.params.id);
    const amount = Number(req.body.diffAmount);
    const attemptedBalance = bankAccount.balance + amount;
    if (attemptedBalance < 0) {
      res.status(400).send({ error: "Insufficient funds" });
      return;
    }
    bankAccount.balance = attemptedBalance;
    bankAccount.save();
    res.status(200).send(JSON.stringify(bankAccount));
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

// @desc    Delete bank account
// @route   DELETE /api/bank-account/:id
// @access  Private
const deleteBankAccount = asyncHandler(async (req, res) => {
  const bankAccount = await BankAccount.findById(req.params.id);

  if (!bankAccount) {
    res.status(400);
    throw new Error("Bank account not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  // add check for admin role here as an OR. admin and members cannot delete account if balance is not 0.00
  if (
    bankAccount.user.toString() !== req.user.id ||
    bankAccount.user.roles !== "admin"
  ) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (bankAccount.balance !== 0) {
    res.status(401);
    throw new Error("Account must have a balance of 0.00 to delete");
  }

  await bankAccount.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBankAccounts,
  setBankAccount,
  updateBankAccount,
  deleteBankAccount,
  depositMoney,
};
