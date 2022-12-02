/* eslint-disable no-unused-vars */
const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const {
  createUser, login,
} = require('../controllers/users');
const { auth } = require('../middlewares/auth');
const { RegistrationValidator, AuthorizationValidator } = require('../validators');
const NotFoundError = require('../errors/NotFoundError');

router.post('/signup', RegistrationValidator, createUser);
router.post('/signin', AuthorizationValidator, login);
router.use(auth);
router.use('/', userRouter);
router.use('/', movieRouter);
router.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемая страница не найдена');
});

module.exports = {
  router,
};
