const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const {
  ExtractJwt
} = require('passport-jwt')
const LocalStrategy = require('passport-local')
const User = require('../models/user')

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.SECRET_KEY
}, async (payload, done) => {
  try {
    console.log(payload)
    // Find the user specified in token
    const user = await User.findById(payload.sub)

    // If user doesn't exists, handle it
    if (!user) {
      return done(null, false)
    }

    // Otherwis, return the user
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}))

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
}, async (email, password, done) => {
  try {
    // Find the user given the email
    const user = await User.findOne({ email: email })

    // If not handle it
    if (!user) {
      return done(null, false)
    }

    // Check if the password is correct
    const isMatch = await user.isValidPassword(password)
    // If not handl it
    if (!isMatch) {
      return done(null, false)
    }

    // Otherwise return the user
    return done(null, user)
  } catch (error) {
    return done(error, false)
  }
}))

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
//
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

module.exports = passport