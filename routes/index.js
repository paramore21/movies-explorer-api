const router = require('express').Router();
const auth = require('../middlewares/auth');
const NotFound = require('../errors/not-found');
const userRoutes = require('./users');
const movieRoutes = require('./movies');
const authRoutes = require('./auth');
const { pageNotFoundMessage } = require('../utils/errorsText');

router.use('/', authRoutes);

router.use(auth);

router.use('/users', userRoutes);

router.use('/movies', movieRoutes);

router.use('*', (req, res, next) => next(new NotFound(pageNotFoundMessage)));

module.exports = router;
