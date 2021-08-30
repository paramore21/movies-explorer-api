const Movie = require('../models/movie');
const BadRequest = require('../errors/bad-request');
const Forbidden = require('../errors/forbidden');
const NotFound = require('../errors/not-found');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => { res.send({ data: movies }); })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description, image,
    trailer, nameRU, nameEN, thumbnail, movieId,
  } = req.body;

  Movie.create({
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
  })
    .then((movie) => {
      if (!movie) {
        throw new BadRequest('Ошибка валидации');
      }
      res.send({ data: movie });
    })
    .catch((err) => { next(err); });
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const ownerId = req.user._id;

  Movie.findById(movieId)
    .orFail(() => {
      throw new NotFound('Карточка по данному id не найдена');
    })
    .then((movie) => {
      if (ownerId.toString() === movie.owner._id.toString()) {
        Movie.deleteOne(movie)
          .then(() => {
            res.send({ data: movie });
          })
          .catch((err) => { next(err); });
      } else {
        throw new Forbidden('Недостаточно прав');
      }
    })
    .catch((err) => { next(err); });
};
