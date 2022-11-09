const asyncHandler = require("express-async-handler");

const BookClub = require("../models/bookClubModel");

// @desc    Get book clubs
// @route   GET /api/book-clubs
// @access  Private
const getBookClubs = asyncHandler(async (req, res) => {
  try {
    const bookClubs = await BookClub.find({}).populate("user", "id name");
    res.status(200).json(bookClubs);
  } catch (error) {
    res.status(500);
    throw new Error("Server error");
  }
});

// @desc    Set book club
// @route   POST /api/book-clubs
// @access  Private
const setBookClub = asyncHandler(async (req, res) => {
  const bookClub = await BookClub.create({
    //TODO: add bookclub properties
    balance: Number(req.body.balance),
    user: req.body.userId,
  });

  res.status(200).json(bookClub);
});

// @desc    Update book club
// @route   PUT /api/book-clubs/:id
// @access  Private
const updateBookClub = asyncHandler(async (req, res) => {
  const bookClub = await BookClub.findById(req.params.id).populate(
    "user",
    "id name balance"
  );

  if (!bookClub) {
    res.status(400);
    throw new Error("Book club not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  if (bookClub.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedBookClub = await BookClub.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedBookClub);
});

// @desc   Add comment to book club
// @route   PUT /api/book-clubs/:id/comment
// @access  Private
const comment = asyncHandler(async (req, res) => {
  try {
    const bookClub = await BookClub.findById(req.params.id);
    const comment = req.body.comment;
    // const attemptedBalance = bankAccount.balance + amount;
    // if (attemptedBalance < 0) {
    //   res.status(400).send({ error: "Insufficient funds" });
    //   return;
    // }
    // bankAccount.balance = attemptedBalance;
    bookClub.save();
    res.status(200).send(JSON.stringify(bookClub));
  } catch (ex) {
    res.status(400).send(ex.message);
  }
});

// @desc    Delete book club
// @route   DELETE /api/book-club/:id
// @access  Private
const deleteBookClub = asyncHandler(async (req, res) => {
  const bookClub = await BookClub.findById(req.params.id);

  if (!bookClub) {
    res.status(400);
    throw new Error("Book club not found");
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Make sure the logged in user matches the goal user
  // add check for admin role here as an OR. admin and members cannot delete account if balance is not 0.00
  if (
    bookClub.user.toString() !== req.user.id ||
    bookClub.user.roles !== "admin"
  ) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //   if (bankAccount.balance !== 0) {
  //     res.status(401);
  //     throw new Error("Account must have a balance of 0.00 to delete");
  //   }

  await bookClub.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBookClubs,
  setBookClub,
  updateBookClub,
  deleteBookClub,
  comment,
};
