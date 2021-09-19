const {
  PORT = 3000,
  JWT_SECRET = 'super-strong-secret',
  DATA_BASE = 'mongodb://localhost:27017/moviesdb',
} = process.env;

module.exports = { PORT, JWT_SECRET, DATA_BASE };
