const asyncHandler = require("express-async-handler");
// TODO wire select dropdown to all users
const hasAdminRole = asyncHandler(async (req, res, next) => {
  if (req.user?.roles === "admin") {
    next();
    return;
  }
  res.status(401).send("Not authorized");
});

module.exports = { hasAdminRole };
