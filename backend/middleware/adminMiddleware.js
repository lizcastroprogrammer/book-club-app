const asyncHandler = require("express-async-handler");
const hasAdminRole = asyncHandler(async (req, res, next) => {
  if (req.user.roles === "admin") {
    next();
    return;
  }
  res.status(401).send("Not authorized");
});

module.exports = { hasAdminRole };
