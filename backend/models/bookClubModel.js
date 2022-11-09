const mongoose = require("mongoose");

const bookClubSchema = mongoose.Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    currentBook: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book Club", bookClubSchema);
