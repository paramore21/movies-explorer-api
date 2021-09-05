const router = require('express').Router();
const { authValidation, loginValidation } = require('../middlewares/validate');

const { login, register } = require('../controllers/users');

router.post('/signup', authValidation, register);

router.post('/signin', loginValidation, login);

module.exports = router;
