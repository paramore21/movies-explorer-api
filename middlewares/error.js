const { defaultError } = require('../utils/errorsText');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({ message: statusCode === 500 ? defaultError : message });
  next();
};
