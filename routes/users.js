const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getUser, updateUser } = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', , updateUser);

module.exports = router;
