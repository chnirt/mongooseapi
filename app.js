const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const mongoose = require('mongoose')
const cors = require('cors')
const session = require('express-session')
const helmet = require('helmet')
const path = require('path')

require('dotenv').config()

const userRoutes = require('./server/routes/users')
const postRoutes = require('./server/routes/posts')

// Requiring passport as we've configured it
var passport = require("./server/config/passport")

// Configure mongoose's promise to global promise
mongoose.promise = global.Promise

// Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production'

// Configure Mongoose
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  // useFindAndModify: false,
  useCreateIndex: true,
}, (err) => {
  if (err) {
    console.log('Error ' + err)
  } else {
    console.log("Connected successfully to server ☁️")
  }
})
mongoose.set('debug', true)

// Initiate our app
const app = express()

// Configure our app
// Allow cross-origin requests
app.use(cors())
// Use morgan to log requests to the console
app.use(logger('dev'))
// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// Parse application/json
app.use(bodyParser.json())
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: process.env.SECRET_KEY, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// Secure your Express apps
app.use(helmet())
// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use('/uploads', express.static('uploads'))
app.use(session({
  secret: 'passport-tutorial',
  cookie: {
    maxAge: 60000
  },
  resave: false,
  saveUninitialized: false
}))

if (!isProduction) {
  app.use(errorHandler())
}

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// })

// Routes
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

// Not found
app.use((req, res, next) => {
  const error = new Error('Not found.')
  error.status = 404
  next(error)
})

// Error 500 or ...
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app