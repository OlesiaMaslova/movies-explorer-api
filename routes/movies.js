const express = require('express');
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { MovieValidator, MovieIdValidator } = require('../validators');

const movieRouter = express.Router();

movieRouter.get('/movies', getSavedMovies);
movieRouter.post('/movies', MovieValidator, createMovie);
movieRouter.delete('/movies/:id', MovieIdValidator, deleteMovie);

module.exports = movieRouter;
