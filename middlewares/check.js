const jwt = require("jsonwebtoken");

// Middleware to check if the user is logged in


const isLoggedIn= (roles) => (req, res, next) => {
  // No token, check if `req.user` is set (e.g., via session)
  if (req.user) {
    return next();
  }
  return res.status(401).json({ message: "Not logged in" });
};



module.exports = { isLoggedIn};
