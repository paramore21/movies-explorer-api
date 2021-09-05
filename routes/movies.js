const router = require('express').Router();
const { createMovieValidation, deleteMovieById } = require('../middlewares/validate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', createMovieValidation, createMovie);

router.delete('/:movieId', deleteMovieById, deleteMovie);

module.exports = router;
