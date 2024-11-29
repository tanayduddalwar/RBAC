const express = require("express");
const { login } = require("../controllers/login");
const { register } = require("../controllers/register");
const {
  isLoggedIn,
  combineMiddlewares,
} = require("../middlewares/authorize");

const {authorize}=require("../middlewares/authorize")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Admin route: Only Admins allowed
router.get("/admin", authorize(["Admin"]), (req, res) => {
  res.send("Welcome Admin!");
});

// Moderator route: Either logged in or a Moderator/Admin
router.get(
  "/moderator",
  authorize(["Moderator"]),
  (req, res) => {
    res.send("Welcome Moderator!");
  }
);

// User route: Either logged in or User/Moderator/Admin role
router.get(
  "/user",
  authorize(["User"]),
  (req, res) => {
    res.send("Welcome User!");
  }
);

module.exports = router;
