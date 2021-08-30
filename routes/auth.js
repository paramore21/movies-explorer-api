const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');

const { login, register } = require('../controllers/users');

router.post(
  '/signup',

  register,
);

router.post(
  '/signin',
  
  login,
);
module.exports = router;
