const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
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
},
  {
    timestamps: true
  }
)

userSchema.pre('save', async function (next) {
  try {
    const user = this
    // Generate a password hash (salt + hash)
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
  } catch (error) {
    next(error)
  }
})

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    const user = this
    return await bcrypt.compare(newPassword, user.password)
  } catch (error) {
    throw new Error(error)
  }
}

module.exports = mongoose.model('user', userSchema)