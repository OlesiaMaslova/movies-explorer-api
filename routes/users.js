const express = require('express');
const {
  updateUserInfo, getUserInfo,
} = require('../controllers/users');
const { UserValidator } = require('../validators');

const userRouter = express.Router();

userRouter.get('/users/me', getUserInfo);
userRouter.patch('/users/me', UserValidator, updateUserInfo);

module.exports = userRouter;
