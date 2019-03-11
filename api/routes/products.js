const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Get products'
  })
})

router.post('/', (req, res, next) => {
  res.status(200).json({
    message: 'Post products'
  })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId
  if (id === 'chin') {
    res.status(200).json({
      message: 'Detail products',
      id: id
    })
  } else {
    res.status(200).json({
      message: 'Fail Detail products'
    })
  }
})

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Update products'
  })
})

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Delete products'
  })
})

module.exports = router