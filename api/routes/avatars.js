const express = require('express')
const router = express.Router()
const multer = require('multer')
const checkAuth = require('../middleware/check-auth')

const AvatarsController = require('../controller/avatars')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(null, false)
  }
}

const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
})

router.get('/', checkAuth, AvatarsController.avatars_get_all)

router.post('/', checkAuth, upload.single('avatarImage'), AvatarsController.avatars_create_avatar)

router.get('/:avatarId', checkAuth, AvatarsController.avatars_get_avatar)

router.patch('/:avatarId', checkAuth, upload.single('avatarImage'), AvatarsController.avatars_update_avatar)

router.delete('/:avatarId', checkAuth, AvatarsController.avatars_delete_avatar)

module.exports = router