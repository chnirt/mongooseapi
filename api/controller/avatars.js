const mongoose = require('mongoose')

const Avatar = require('../models/avatar')
const User = require('../models/user')

exports.avatars_get_all = (req, res, next) => {
  Avatar.find()
    .select('user avatarImage _id')
    .populate('user', 'email')
    .exec()
    .then(avatars => {
      res.status(200).json({
        count: avatars.length,
        avatars: avatars.map(avatar => {
          return {
            _id: avatar._id,
            user: avatar.user,
            avatarImage: avatar.avatarImage,
            request: {
              type: 'GET',
              url: 'http:localhost:6969/avatars/' + avatar._id
            }
          }
        })
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.avatars_create_avatar = (req, res, next) => {
  User.findById(req.body.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'User not found'
        })
      }
      const avatar = new Avatar({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.userId,
        avatarImage: req.file.path
      })
      return avatar.save()
    })
    .then(result => {
      console.log(result)
      res.status(201).json({
        message: 'Avatar stored',
        createdAvatar: result,
        request: {
          type: 'GET',
          url: 'http:localhost:6969/avatars/' + result._id
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.avatars_get_avatar = (req, res, next) => {
  Avatar.findById(req.params.avatarId)
    .populate('user')
    .exec()
    .then(avatar => {
      if (!avatar) {
        return res.status(404).json({
          messsage: 'No valid entry found for provided ID'
        })
      }
      res.status(200).json({
        avatar: avatar,
        request: {
          type: 'GET',
          url: 'http://localhost:6969/avatars'
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

exports.avatars_update_avatar = (req, res, next) => {
  const id = req.params.avatarId
  const updateAvt = { avatarImage: req.file.path }
  // const updateOps = {}
  // for (const ops of req.body) {
  //   updateOps[ops.propName] = ops.value
  // }
  Avatar.update({ _id: id }, { $set: updateAvt })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Avatar updated',
        request: {
          type: 'GET',
          url: 'http://localhost:6969/avatars/' + id
        }
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.avatars_delete_avatar = (req, res, next) => {
  Avatar.remove({ _id: req.params.avatarId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'Avatar deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:6969/avatar',
          body: { userId: 'ID', avatarImage: 'String' }
        }
      })
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
}

