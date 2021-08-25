const Movie = require('../models/movie')

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
  .then((movies) => { res.send({data: movies}) })
  .cath(next)
}

module.exports.createMovie = (req, res, next) => {
  const { country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId } = req.body;

  Movie.create({ country, director, duration, year, description, image, trailer, nameRU, nameEN, thumbnail, movieId })
  .then((movie) => {
    if (!movie) {
      throw new Error()
    }
    res.send({ data: movie });
  })
  .catch((err) => { next(err); })
};

module.exports.deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const ownerId = req.user._id;

  Movie.findById(movieId)
  .orFail(() => {
    throw new Error()
  })
  .then((movie) => {
    if (ownerId.toString() === movie.owner._id.toString()) {
      Movie.deleteOne(movie)
      .then(() => {
        res.send({data: movie})
      })
    } else {
      throw new Error();
    }
  })
  .catch((err) => { next(err) });
};