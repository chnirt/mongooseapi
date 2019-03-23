const express = require('express')
const router = express.Router()

const UsersController = require('../controllers/users')

const {
  validateParam,
  validateBody,
  schemas
} = require('../helpers/routeHelpers')

const upload = require('../config/multer')

const checkAuth = require('../middleware/check-auth')

router
  .route('/')
  .get(UsersController.getUsers)
  .post(
    validateBody(schemas.userSchema),
    upload.single('avatarImage'),
    UsersController.createUser)

router
  .route('/:userId')
  .get(
    validateParam(schemas.idSchema, 'userId'),
    UsersController.getUser)
  .put([
      validateParam(schemas.idSchema, 'userId'),
      validateBody(schemas.userSchema)
    ],
    UsersController.replaceUser)
  .patch([
      validateParam(schemas.idSchema, 'userId'),
      validateBody(schemas.userOptionalSchema)
    ],
    // upload.single('avatarImage'), 
    UsersController.updateUser)
  .delete(UsersController.deleteUser)

router
  .route('/:userId/posts')
  .get(
    validateParam(schemas.idSchema, 'userId'),
    UsersController.getUserPosts)
  .post([
      validateParam(schemas.idSchema, 'userId'),
      validateBody(schemas.userPostSchema)
    ],
    UsersController.createUserPost)
// router.post('/login', UsersController.users_login)

module.exports = router