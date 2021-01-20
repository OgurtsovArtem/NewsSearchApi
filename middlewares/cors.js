const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: [
  'https://ogurtsovartem.github.io',
  'http://localhost:8080',
  'https://www.newsartemogurtsov.students.nomoreparties.xyz/',
  'https://newsartemogurtsov.students.nomoreparties.xyz/',
  'http://www.newsartemogurtsov.students.nomoreparties.xyz/',
  'http://newsartemogurtsov.students.nomoreparties.xyz/',
  'http://localhost:3000',
  'http://localhost:80',
],
  optionsSuccessStatus: 200,
  credentials: true,
};

router.use(cors(corsOptions));

module.exports = router;