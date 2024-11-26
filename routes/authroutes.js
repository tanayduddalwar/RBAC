// routes/authRoutes.js
const express = require("express");
const { login } = require("../controllers/login");
const { authorize } = require("../middlewares/authorize");
const { register } = require("../controllers/register");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/admin", authorize(["Admin"]), (req, res) => {
  res.send("Welcome Admin!");
});
router.get("/moderator", authorize(["Moderator", "Admin"]), (req, res) => {
  res.send("Welcome Moderator!");
});
router.get("/user", authorize(["User", "Moderator", "Admin"]), (req, res) => {
  res.send("Welcome User!");
});

module.exports = router;
