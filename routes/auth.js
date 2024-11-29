const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User=require("../models/user")
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/auth/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
  User.findOne({ googleId: profile.id })
  .then(user => {
    if (user) {
      // User exists, proceed with the existing user
      return done(null, user);
    } else {
      // User does not exist, create a new user
      const newUser = new User({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value,
        role: 'User',  // You can set default role or decide based on your logic
      });

      newUser.save()
        .then(savedUser => done(null, savedUser))  // User saved, proceed with the new user
        .catch(err => done(err));  // Handle any errors
    }
  })
  .catch(err => done(err));  

}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});