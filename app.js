require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const error = require('./middlewares/error');
const { limiter } = require('./utils/rateLimiter');
const { PORT, DATA_BASE } = require('./utils/config');

const app = express();
app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
