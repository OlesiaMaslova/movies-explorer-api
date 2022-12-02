/* eslint-disable consistent-return */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const AuthError = require('../errors/AuthError');
const BadRequestError = require('../errors/BadRequestError');
const DuplicatedValueError = require('../errors/DuplicatedValueError');
const NotFoundError = require('../errors/NotFoundError');
const { JWT_SECRET, NODE_ENV } = require('../config');

async function getUserInfo(req, res, next) {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return next(new NotFoundError('Такого пользователя не существует'));
    }
    return res.status(200).send(user);
  } catch (err) {
    next(err);
  }
}

async function updateUserInfo(req, res, next) {
  const { email, name } = req.body;
  let user;
  try {
    user = await User.findByIdAndUpdate(req.user._id, { email, name }, {
      new: true,
      runValidators: true,
    });
    return res.status(200).send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Ошибка валидации'));
    }
    next(err);
  }
}

async function createUser(req, res, next) {
  try {
    const { email, password, name } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await new User({ email, password: hashedPassword, name }).save();
    res.status(200).send({ email: user.email, name: user.name });
  } catch (err) {
    if (err.code === 11000) {
      return next(new DuplicatedValueError('Такой email уже зарегестрирован'));
    }
    return next(err);
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return next(new AuthError('Неверные почта или пароль'));
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return next(new AuthError('Неверные почта или пароль'));
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY2OTg3OTQ5MiwiaWF0IjoxNjY5ODc5NDkyfQ.hfygoNqljHro7HFJVzeEcoiy7EE-mmxw3e25rNK2gxM', { expiresIn: '7d' });
    if (!token) {
      return next(new AuthError('Некорректный токен'));
    }
    return res.status(200).send({ token });
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  getUserInfo,
  updateUserInfo,
  createUser,
  login,
};
