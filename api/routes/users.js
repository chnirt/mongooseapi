const express = require('express')
const router = express.Router()

const checkAuth = require('../middleware/check-auth')

const UsersController = require('../controller/users')

router.get('/', checkAuth, UsersController.users_get_all)

router.post('/signup', UsersController.users_signup)

router.post('/login', UsersController.users_login)

router.get('/:userId', checkAuth, UsersController.users_get_user)

router.patch('/:userId', checkAuth, UsersController.users_update_user)

router.delete('/:userId', checkAuth, UsersController.users_delete_user)

module.exports = router