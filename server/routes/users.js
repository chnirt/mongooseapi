const express = require("express");
const router = require("express-promise-router")();

const UsersController = require("../controllers/users");

const {
  validateParam,
  validateBody,
  schemas
} = require("../helpers/routeHelpers");

const upload = require("../config/multer");

const checkAuth = require("../middlewares/check-auth");
const passport = require("passport");
const passportConf = require("../config/passport");

const PasssportSignIn = passport.authenticate("local", { session: false });
const PassportJWT = passport.authenticate("jwt", { session: false });

router
  .route("/")
  .get(UsersController.getUsers)
  .post(validateBody(schemas.userSchema), UsersController.createUser);

router
  .route("/:userId")
  .get(
    PassportJWT,
    validateParam(schemas.idSchema, "userId"),
    UsersController.getUser
  )
  .put(
    upload.single("file"),
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.putUserSchema)
    ],
    UsersController.replaceUser
  )
  .patch(
    upload.single("file"),
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.patchUserSchema)
    ],
    UsersController.updateUser
  )
  .delete(UsersController.deleteUser);

router
  .route("/login")
  .post(
    validateBody(schemas.authSchema),
    PasssportSignIn,
    UsersController.loginUser
  );

router
  .route("/:userId/posts")
  .get(validateParam(schemas.idSchema, "userId"), UsersController.getUserPosts)
  .post(
    [
      validateParam(schemas.idSchema, "userId"),
      validateBody(schemas.userPostSchema)
    ],
    UsersController.createUserPost
  );

module.exports = router;
