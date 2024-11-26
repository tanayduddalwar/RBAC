const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Log the incoming request for debugging
      console.log("Login attempt:", username);
  
      // Step 1: Find the user
      const user = await User.findOne({ username });
      if (!user) {
        console.error("User not found:", username);
        return res.status(404).json({ message: "User not found" });
      }
  
      // Step 2: Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.error("Password mismatch for user:", username);
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      // Step 3: Generate token
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );
  
      res.status(200).json({ token });
    } catch (error) {
      // Log the error in the console for debugging
      console.error("Error in login:", error);
  
      // Return a generic error message to the client
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  };
  