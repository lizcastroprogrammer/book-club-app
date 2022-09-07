const asyncHandler = require("express-async-handler");

// @desc Home Page
// @route GET /
// @access Public
const home = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Welcome to the badbank API" });
});

// @desc Create Account Page
// @route POST /account/create/:name/:email/:password
// @access Public
const createAccount = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Create an account to get started" });
});

// @desc Login Page
// @route GET /account/login/:email/:password
// @access Public
const logIn = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Please log in" });
});

// @desc Deposit Page
// @route PUT /account/deposit/:email/:amount
// @access Private
const deposit = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "How much would you like to deposit?" });
});

// @desc Withdraw Page
// @route PUT /account/withdraw/:email/:amount
// @access Private
const withdraw = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "How much would you like to withdraw?" });
});

// @desc Balance Page
// @route GET /account/balance/:email
// @access Private
const balance = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "This is your current balance" });
});

// @desc AllData Page
// @route GET /accounts/all
// @access Public
const allData = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Browse our current users" });
});

module.exports = {
  home,
  createAccount,
  logIn,
  deposit,
  withdraw,
  balance,
  allData,
};
