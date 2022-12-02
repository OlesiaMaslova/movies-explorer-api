const {
  Joi, celebrate, Segments,
} = require('celebrate');

const regexp = /((http|ftp|https):\/\/)?(([\w.-]*)\.([\w]*))/;

const AuthorizationValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const RegistrationValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const UserValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
});

const MovieValidator = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regexp),
    trailerLink: Joi.string().required().pattern(regexp),
    thumbnail: Joi.string().required().pattern(regexp),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.string().required(),
  }),
});

module.exports = {
  AuthorizationValidator,
  RegistrationValidator,
  MovieValidator,
  UserValidator,
};
