const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')
const Post = require('../models/post')

module.exports = {
  getUsers: async (req, res, next) => {
    try {
      const users = await User.find()
      res.status(200).json(users)
    } catch (error) {
      next(error)
    }
  },
  createUser: async (req, res, next) => {
    try {
      const newUser = new User(req.value.body)
      // newUser.avatarImage = req.file.path
      const user = await newUser.save()
      res.status(201).json(user)
    } catch (error) {
      next(error)
    }
  },
  getUser: async (req, res, next) => {
    try {
      const {
        userId
      } = req.value.params
      const user = await User.findById(userId)
      res.status(200).json(user)
    } catch (error) {
      next(error)
    }
  },
  replaceUser: async (req, res, next) => {
    try {
      const {
        userId
      } = req.value.params
      const newUser = req.value.body
      // newUser.avatarImage = req.file.path
      const result = await User.findByIdAndUpdate(userId, newUser)
      res.status(200).json({
        success: 'Success'
      })
    } catch (error) {
      next(error)
    }
  },
  updateUser: async (req, res, next) => {
    try {
      const {
        userId
      } = req.value.params
      const newUser = req.value.body
      // newUser.avatarImage = req.file.path
      const result = await User.findByIdAndUpdate(userId, newUser)
      res.status(200).json({
        success: 'Success'
      })
    } catch (error) {
      next(error)
    }
  },
  deleteUser: async (req, res, next) => {
    try {
      const {
        userId
      } = req.params
      const result = await User.findByIdAndDelete(userId)
      res.status(200).json({
        success: 'Success'
      })
    } catch (error) {
      next(error)
    }
  },
  getUserPosts: async (req, res, next) => {
    try {
      const {
        userId
      } = req.value.params
      const user = await User.findById(userId).populate('posts')
      res.status(200).json(user.posts)
    } catch (error) {
      next(error)
    }
  },
  createUserPost: async (req, res, next) => {
    try {
      const {
        userId
      } = req.value.params
      // Get user
      const user = await User.findById(userId)
      // Create a new Post
      const newPost = new Post(req.value.body)
      // Assign user as a post's user
      newPost.poster = user
      // Save the post
      await newPost.save()
      // Add post to the user's posting array 'posts'
      user.posts.push(newPost)
      // Save the user
      await user.save()
      res.status(201).json(newPost)
    } catch (error) {
      next(error)
    }
  }
}

// exports.users_get_all = (req, res, next) => {
//   User.find()
//     .select('email password _id')
//     .exec()
//     .then(users => {
//       const response = {
//         count: users.length,
//         users: users.map(user => {
//           return {
//             _id: user._id,
//             email: user.email,
//             password: user.password,
//             request: {
//               type: 'GET',
//               url: 'http://localhost:6969/users/' + user._id
//             }
//           }
//         })
//       }
//       res.status(200).json(response)
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({
//         error: err
//       })
//     })
// }

// exports.users_signup = (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: 'Mail exists'
//         })
//       } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             console.log(err)
//             res.status(500).json({
//               error: err
//             })
//           } else {
//             const user = new User({
//               _id: new mongoose.Types.ObjectId(),
//               email: req.body.email,
//               password: hash
//             })
//             user.save()
//               .then(result => {
//                 console.log(result)
//                 res.status(201).json({
//                   message: 'User stored',
//                   createdUser: result,
//                   request: {
//                     type: 'GET',
//                     url: 'http:localhost:6969/users/' + result._id
//                   }
//                 })
//               })
//               .catch(err => {
//                 console.log(err)
//                 res.status(500).json({
//                   error: err
//                 })
//               })
//           }
//         })
//       }
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       })
//     })
// }

// exports.users_login = (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then(user => {
//       if (user.length < 1) {
//         return res.status(401).json({
//           message: 'Auth failed, match email'
//         })
//       }
//       bcrypt.compare(req.body.password, user[0].password, (err, result) => {
//         if (err) {
//           console.log(err)
//           res.status(500).json({
//             error: err
//           })
//         }
//         if (result) {
//           const token = jwt.sign({
//             email: user[0].email,
//             userId: user[0]._id,
//           }, 'secret key', {
//               expiresIn: '1h',
//             })
//           return res.status(200).json({
//             message: 'Auth successfully',
//             token: token
//           })
//         }
//         return res.status(401).json({
//           message: 'Auth failed, dont match'
//         })
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({
//         error: err
//       })
//     })
// }

// exports.users_get_user = (req, res, next) => {
//   const id = req.params.userId
//   User.findById(id)
//     .select('email password _id')
//     .exec()
//     .then(user => {
//       if (user) {
//         res.status(200).json({
//           user: user,
//           request: {
//             type: 'GET',
//             url: 'http://localhost:6969/users'
//           }
//         })
//       } else {
//         res.status(404).json({
//           messsage: 'No valid entry found for provided ID'
//         })
//       }
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({
//         error: err
//       })
//     })
// }

// exports.users_replace_user = (req, res, next) => {
//   const id = req.params.userId
//   User.update({ _id: id }, { $set: req.body })
//     .exec()
//     .then(result => {
//       console.log(result)
//       res.status(200).json({
//         message: 'User updated',
//         request: {
//           type: 'GET',
//           url: 'http://localhost:6969/users/' + id
//         }
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({
//         error: err
//       })
//     })
// }

// exports.users_update_user = (req, res, next) => {
//   const id = req.params.userId
//   const updateOps = {}
//   for (const ops of req.body) {
//     updateOps[ops.propName] = ops.value
//   }
//   User.update({ _id: id }, { $set: updateOps })
//     .exec()
//     .then(result => {
//       console.log(result)
//       res.status(200).json({
//         message: 'User updated',
//         request: {
//           type: 'GET',
//           url: 'http://localhost:6969/users/' + id
//         }
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({
//         error: err
//       })
//     })
// }

// exports.users_delete_user = (req, res, next) => {
//   User.remove({ _id: req.params.userId })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: 'User deleted',
//         request: {
//           type: 'POST',
//           url: 'http://localhost:6969/users',
//           body: { email: 'String', password: 'String' }
//         }
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json({
//         error: err
//       })
//     })
// }
