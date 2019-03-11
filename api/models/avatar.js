const mongoose = require('mongoose')

const avatarSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  avatarImage: { type: String, required: true }
})

module.exports = mongoose.model('Avatar', avatarSchema) 