const mongoose = require("mongoose");

const bookClubSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    balance: {
      type: Number,
      required: [true, "Please add a balance"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book Club", bookClubSchema);
