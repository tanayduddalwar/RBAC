// middlewares/authorize.js
const jwt = require("jsonwebtoken");
exports.authorize = (roles) => (req, res, next) => {
  // Check if user is logged in (via session or token).
  if (req.user) {
    return next(); // User is already logged in.
  }

  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (roles.includes(decoded.role)) {
      req.user = decoded; // Attach user details to request.
      return next(); // Role authorized.
    }
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token", error });
  }

  return res.status(403).json({ message: "You do not have access to this endpoint" });
};
