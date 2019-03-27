const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// require('dotenv').config()

const app = express()

const userRoutes = require('./api/routes/users')
const postRoutes = require('./api/routes/posts')

//Promise
mongoose.Promise = global.Promise

//Mongoose connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true
}, (err) => {
  if (err) {
    console.log('Error ' + err)
  } else {
    console.log("Connected successfully to server")
  }
})
mongoose.set('useCreateIndex', true)

//Logger middleware
app.use(logger('dev'))

//Static file
app.use('/uploads', express.static('uploads'))

//Parse json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(201).json({})
  }
  next()
})

//Routes
app.use('/users', userRoutes)
app.use('/posts', postRoutes)

//Not found
app.use((req, res, next) => {
  const error = new Error('Not found.')
  error.status = 404
  next(error)
})

//Error 500 or ...
app.use((error, req, res, next) => {
  res.status(error.status || 500)
  res.json({
    error: {
      message: error.message
    }
  })
})

module.exports = app