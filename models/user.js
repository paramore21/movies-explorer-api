const {isEmail} = require('validator');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => isEmail(v, { require_protocol: true }),
      message: 'Неверный формат ссылки'
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    deafult: "Ильнура"
  }
});

module.exports = mongoose.module('user', userSchema);