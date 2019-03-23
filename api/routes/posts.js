const express = require('express')
const router = express.Router()

const PostController = require('../controllers/posts')

const {
  validateParam,
  validateBody,
  schemas
} = require('../helpers/routeHelpers')

router
  .route('/')
  .get(PostController.getPosts)
  .post(
    validateBody(schemas.PostSchema),
    PostController.createPost)

router
  .route('/:postId')
  .get(
    validateParam(schemas.idSchema, 'postId'),
    PostController.getPost)
  .put([
    validateParam(schemas.idSchema, 'postId'),
    validateBody(schemas.putPostSchema)
  ], PostController.replacePost)
  .patch([
    validateParam(schemas.idSchema, 'postId'),
    validateBody(schemas.patchPostSchema)
  ], PostController.updatePost)
  .delete(
    validateParam(schemas.idSchema, 'postId'),
    PostController.deletePost)

module.exports = router