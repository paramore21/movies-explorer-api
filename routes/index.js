const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFound = require('../errors/not-found');

router.use(auth);

router.use('/users', require('./users'));

router.use('/movies', require('./movies'));

router.use('*', (req, res, next) => {
  next(new NotFound('Страница не найдена'));
});
