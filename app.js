require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors, celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/not-found');
const { requestLogger, errorLogger } = require('./middlewares/logger');


const app = express();

mongoose.connect('mongodb://localhost:27017/diplomadb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.listen(3000);
