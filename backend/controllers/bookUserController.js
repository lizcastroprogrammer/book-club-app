const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const { User } = require("../models/bookUserModel");
const BookClub = require("../models/bookClubModel");
const SEED_ADMIN_EMAIL =
  process.env.ADMIN_EMAIL || "lizdev-admin@mailinator.com";
// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //   if (user) {
  //     const bankAccount = await BankAccount.create({
  //       balance: 0,
  //       user: user._id,
  //     });
  //     if (bankAccount) {
  //       res.status(201).json({
  //         _id: user.id,
  //         name: user.name,
  //         email: user.email,
  //         token: generateToken(user._id),
  //       });
  //     }
  //     res.status(500);
  //     throw new Error("Internal server error");
  //     q;
  //   } else {
  //     res.status(400);
  //     throw new Error("Invalid user data");
  //   }
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc    Get all book clubs
// @route   GET /all
// @access  Private
const getAll = asyncHandler(async (req, res) => {
  const bookClubs = await BookClub.find({});

  if (bookClubs) {
    res.send(bookClubs);
  } else {
    res.status(500);
    throw new Error("Server error");
  }
});

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

async function userSeeder() {
  // find all
  const data = await User.find({ email: SEED_ADMIN_EMAIL }).exec();
  if (data.length !== 0) {
    // Data exists, no need to seed.
    console.log("Data exists, no need to seed.");
    return;
  }
  const seed = new User({
    name: process.env.ADMIN_NAME || "Liz Dev",
    email: SEED_ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD || "Test12345",
    roles: ["admin"],
  });

  await seed.save();
}
userSeeder();

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAll,
  userSeeder,
};
