const mongoose = require('mongoose');
const { isEmail } = require('validator');
const { wrongLinkMessage } = require('../utils/errorsText');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (v) => isEmail(v, { require_protocol: true }),
      message: wrongLinkMessage,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    deafult: 'Ильнура',
  },
});

module.exports = mongoose.model('user', userSchema);
