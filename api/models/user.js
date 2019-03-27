const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  email: {
    type: String
  },
  password: {
    type: String
  },
  avatarImage: {
    type: String
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'post'
  }]
  // name: { type:String},
  // username: { type:String},
  // website: { type: String},
  // bio: { type: String},
  // phone: { type: String},
  // role: { type: Number, default: 0},
  // authenticated: { type: Number, default: 0},
}, {
  timestamps: true
})

module.exports = mongoose.model('user', userSchema)