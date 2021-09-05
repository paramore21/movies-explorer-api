require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const error = require('./middlewares/error');

const {
  PORT = 3000,
  DATA_BASE = 'mongodb://localhost:27017/moviesdb',
} = process.env;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(DATA_BASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const allowedCors = [
  'http://movies-diploma.nomoredomains.rocks',
  'https://movies-diploma.nomoredomains.rocks',
  'http://api.movies-diploma.nomoredomains.rocks',
  'https://api.movies-diploma.nomoredomains.rocks',
  'http://localhost:3000',
];

app.use(helmet());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(error);

app.listen(PORT);
