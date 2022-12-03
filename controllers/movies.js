const Movie = require('../models/movie');
const AccessDeniedError = require('../errors/AccessDeniedError');
const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');

async function getSavedMovies(req, res, next) {
  try {
    const id = req.user._id;
    const movies = await Movie.find({ owner: id });
    await res.status(200).send(movies);
  } catch (err) {
    next(err);
  }
}

async function createMovie(req, res, next) {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const movie = await new Movie({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    }).save();
    return res.status(200).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError('Некорректные данные'));
    }
    return next(err);
  }
}

async function deleteMovie(req, res, next) {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      return next(new NotFoundError('Фильм с указанным id не найден'));
    }
    if (!movie.owner.equals(req.user._id)) {
      return next(new AccessDeniedError('Недостаточно прав у пользователя'));
    }
    await movie.remove();
  } catch (err) {
    next(err);
  }
  return res.status(200).send({ message: 'Карточка удалена' });
}

module.exports = {
  getSavedMovies,
  createMovie,
  deleteMovie,
};
