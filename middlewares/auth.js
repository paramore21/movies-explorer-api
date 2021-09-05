const jwt = require('jsonwebtoken');
const NoAuth = require('../errors/no-auth');
const { noAuthMessage } = require('../utils/errorsText');

const { JWT_SECRET = 'DEFAULT_JWT_SECRET' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new NoAuth();
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (e) {
    throw new NoAuth(noAuthMessage);
  }
  req.user = payload;
  next();
};
