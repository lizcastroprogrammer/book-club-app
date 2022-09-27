const asyncHandler = require("express-async-handler");
// TODO wire select dropdown to all users
const hasAdminRole = asyncHandler(async (req, res, next) => {
  console.log("TEST 7 req.user=", req.user);
  if (req.user?.roles === "admin") {
    console.log("TEST 8 req.user=", req.user);
    next();
    return;
  }
  res.status(401).send("Not authorized");
});

module.exports = { hasAdminRole };
