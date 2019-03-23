const Post = require('../models/post')
const User = require('../models/user')

module.exports = {
  getPosts: async (req, res, next) => {
    try {
      const posts = await Post.find()
      res.status(200).json(posts)
    } catch (error) {
      next(error)
    }
  },
  createPost: async (req, res, next) => {
    try {
      // Find a actual poster
      const poster = await User.findById(req.body.poster)
      // Create a new post
      const newPost = new Post(req.body)
      // Save the post
      await newPost.save()
      // Add newly created post
      poster.posts.push(newPost)
      // Save the poster
      await poster.save()
      res.status(201).json(newPost)
    } catch (error) {
      next(error)
    }
  },
  getPost: async (req, res, next) => {
    try {
      const {
        postId
      } = req.value.params
      const post = await Post.findById(postId)
      res.status(200).json(post)
    } catch (error) {
      next(error)
    }
  },
  replacePost: async (req, res, next) => {
    try {
      const {
        postId
      } = req.value.params
      const newPost = req.value.body
      const result = await Post.findByIdAndUpdate(postId, newPost)
      res.status(200).json({
        success: 'Success'
      })
    } catch (error) {
      next(error)
    }
  },
  updatePost: async (req, res, next) => {
    try {
      const {
        postId
      } = req.value.params
      const newPost = req.value.body
      const result = await Post.findByIdAndUpdate(postId, newPost)
      res.status(200).json({
        success: 'Success'
      })
    } catch (error) {
      next(error)
    }
  },
  deletePost: async (req, res, next) => {
    try {
      const {
        postId
      } = req.value.params
      const result = await Post.findByIdAndDelete(postId)
      res.status(200).json({
        success: 'Success'
      })
    } catch (error) {
      next(error)
    }
  }
}