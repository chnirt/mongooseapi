const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const userRoutes = require('./api/routes/users')
const avatarRoutes = require('./api/routes/avatars')
const productRoutes = require('./api/routes/products')

//Mongoose connect
mongoose.connect('mongodb://trinhchinchin:matkhaula1@ds113098.mlab.com:13098/backendapi',
  {
    useNewUrlParser: true
  }
)
mongoose.set('useCreateIndex', true);

//Promise
mongoose.Promise = global.Promise

//Logger middleware
app.use(morgan('dev'))

//Static file
app.use('/uploads', express.static('uploads'))

//Parse json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
    return res.status(201).json({})
  }
  next();
})

app.use('/products', productRoutes)
app.use('/users', userRoutes)
app.use('/avatars', avatarRoutes)

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