const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports.authorization = (req, res, next) => {
  const { email, name, password } = req.body;

  User.findOne({ email }).then((findedUser) => {
    if (findedUser) {
      res.status(409).send({
        message: 'Пользователь уже существует',
      });
    }
  });

  bcrypt.hash(password, 10).then((hash) => {
    User.create({ name, email, password: hash })
      .then((user) => {
        if (!user) {
          next();
        }
        res.send({ _id: user._id });
      })
      .catch((err) => { next(err); });
  });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.body._id)
    .orFail(() => {
      throw new Error();
    })
    .then((user) => {
      if (!user) {
        throw new Error();
      }
      res.send(user);
    })
    .catch((err) => { next(err); });
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;
  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new Error();
    })
    .then((user) => {
      if (!user) {
        throw new Error();
      }
      res.send({ data: user });
    })
    .catch((err) => { next(err); });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error();
  }
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new Error();
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Error();
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          res.send({ token });
        })
        .catch((err) => { next(err); });
    })
    .catch(next);
};
