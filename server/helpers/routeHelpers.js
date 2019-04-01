const Joi = require('joi')

module.exports = {
  validateParam: (schema, name) => {
    return (req, res, next) => {
      const result = Joi.validate({
        param: req['params'][name]
      }, schema)
      if (result.error) {
        return res.status(400).json(result.error)
      } else {
        if (!req.value)
          req.value = {}
        if (!req.value['params'])
          req.value['params'] = {}

        req.value['params'][name] = result.value.param
        next()
      }
    }
  },
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema)
      if (result.error) {
        return res.status(400).json(result.error)
      } else {
        if (!req.value)
          req.value = {}
        if (!req.value['body'])
          req.value['body'] = {}

        req.value['body'] = result.value
        next()
      }
    }
  },
  schemas: {
    idSchema: Joi.object().keys({
      param: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
    }),
    authSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    userSchema: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required()
    }),
    userOptionalSchema: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string()
    }),
    putUserSchema: Joi.object().keys({
      email: Joi.string().email().required()
    }),
    patchUserSchema: Joi.object().keys({
      email: Joi.string().email(),
      password: Joi.string()
    }),
    userPostSchema: Joi.object().keys({
      postImage: Joi.string().required(),
      content: Joi.string().required()
    }),
    PostSchema: Joi.object().keys({
      poster: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
      postImage: Joi.string().required(),
      content: Joi.string().required()
    }),
    putPostSchema: Joi.object().keys({
      postImage: Joi.string().required(),
      content: Joi.string().required()
    }),
    patchPostSchema: Joi.object().keys({
      postImage: Joi.string(),
      content: Joi.string()
    })
  }
}