require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const jwt = require("jsonwebtoken"); 
const {isLoggedIn}=require("./middlewares/check");
// Routes import
const authRoutes = require("./routes/authroutes");
const User = require("./models/user"); 
require("./routes/auth")
const app = express();

// Middleware setup
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());
app.use(express.json());

function isLoggedin(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/api/user',
    failureRedirect: '/auth/google/failure'
  })
);


app.get('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.send('Goodbye!');
});

app.get('/auth/google/failure', (req, res) => {
  res.send('Failed to authenticate..');
});

// Use your custom auth routes (e.g., login, register)
app.use("/api", authRoutes);

// MongoDB connection and server setup
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((error) => console.error("Database connection error:", error));



