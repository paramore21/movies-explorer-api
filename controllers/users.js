const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const BadRequest = require('../errors/bad-request');
const Conflict = require('../errors/conflict');
const NoAuth = require('../errors/no-auth');
const NotFound = require('../errors/not-found');
const {
  conflictMessage, badRequestMessage, noAuthMessage, userNotFoundMessage,
} = require('../utils/errorsText');

const { JWT_SECRET = 'DEFAULT_JWT_SECRET' } = process.env;

module.exports.register = (req, res, next) => {
  const { email, name, password } = req.body;

  User.findOne({ email }).then((findedUser) => {
    if (findedUser) {
      next(new Conflict(conflictMessage));
    } else {
      bcrypt.hash(password, 10).then((hash) => {
        if (!email || !password || !name) {
          next(new BadRequest(badRequestMessage));
        }
        User.create({ name, email, password: hash })
          .then((user) => {
            if (!user) {
              next(new NotFound(userNotFoundMessage));
            }
            res.send({ _id: user._id });
          })
          .catch((err) => { next(err); });
      });
    }
  })
    .catch((err) => { next(err); });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFound(userNotFoundMessage);
    })
    .then((user) => {
      if (!user) {
        throw new BadRequest(badRequestMessage);
      }
      res.send(user);
    })
    .catch((err) => { next(err); });
};

module.exports.updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { email, name } = req.body;

  User.findOne({ email })
    .then((findedUser) => {
      if (findedUser) {
        next(new Conflict(conflictMessage));
      } else {
        User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
          .orFail(() => {
            throw new NotFound(userNotFoundMessage);
          })
          .then((user) => {
            if (!user) {
              throw new BadRequest(badRequestMessage);
            }
            res.send({ data: user });
          })
          .catch((err) => { next(err); });
      }
    })
    .catch((err) => { next(err); });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new NotFound(userNotFoundMessage);
  }
  User.findOne({ email }).select('+password')
    .orFail(() => {
      throw new NoAuth(noAuthMessage);
    })
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NoAuth(noAuthMessage);
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
          res.send({ token });
        })
        .catch((err) => { next(err); });
    })
    .catch(next);
};
