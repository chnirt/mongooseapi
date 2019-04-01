const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  postImage: { type: String },
  content: { type: String },
  poster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  }
})

module.exports = mongoose.model('post', postSchema)
