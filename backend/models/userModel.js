// const mongoose = require("mongoose");

// const ROLES = [
//   "member", // a layperson who holds a bank account
//   "admin", // the all powerful admin
// ];

// const userSchema = mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please add a name"],
//     },
//     email: {
//       type: String,
//       required: [true, "Please add an email"],
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: [true, "Please add a password"],
//     },
//     roles: {
//       type: String,
//       enum: ROLES,
//       default: "member",
//       required: [true, "Please add a role"],
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = { User: mongoose.model("User", userSchema), ROLES };
