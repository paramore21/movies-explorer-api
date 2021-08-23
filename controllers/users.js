const bcrypt = require('bcrypt');
const user = require('../models/user');
const User = require('../models/user')

module.exports.getUser = (req, res, next) => {
  const { email, name, password } = req.body;

  User.findOne({ email }).then((findedUser) => {
    if (findedUser) {
      res.status(409).send({
        message: 'Пользователь уже существует'
      });
    }
  });

  bcrypt.hash(password, 10).then((hash) => {
    user.create({name, email, password: hash})
    .then((user) => {
      if (!user) {
        next();
      }
      res.send({_id: user._id});
    })
    .catch((err) => {next(err)})
  });
};

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me