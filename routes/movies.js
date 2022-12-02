const express = require('express');
const { getSavedMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { MovieValidator } = require('../validators');

const movieRouter = express.Router();

movieRouter.get('/movies', getSavedMovies);
movieRouter.post('/movies', MovieValidator, createMovie);
movieRouter.delete('/movies/:id', deleteMovie);

module.exports = movieRouter;
