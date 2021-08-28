const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(2),
    director: Joi.string().required(),
    duration: Joi.string().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(/^((http|https)?:\/\/)(w{3}\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.)+[A-Za-zА-Яа-я0-9-]{2,8}(([\w\-._~:/?#[\]@!$&'()*+,;=])*)?\/?#?/),
    trailer: Joi.string().pattern(/^((http|https)?:\/\/)(w{3}\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.)+[A-Za-zА-Яа-я0-9-]{2,8}(([\w\-._~:/?#[\]@!$&'()*+,;=])*)?\/?#?/),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    thumbnail: Joi.string().pattern(/^((http|https)?:\/\/)(w{3}\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.)+[A-Za-zА-Яа-я0-9-]{2,8}(([\w\-._~:/?#[\]@!$&'()*+,;=])*)?\/?#?/),
    movieId: Joi.string().required(),
  })}), createMovie);

router.delete('/movies/movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().hex(),
  }),
}), deleteMovie);

module.exports = router;
