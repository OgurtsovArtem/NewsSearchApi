const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: [
  'https://ogurtsovartem.github.io',
  'http://localhost:8080',
  'http://newsproject.students.nomoreparties.xyz',
  'http://localhost:3000',
  'http://localhost:80',
],
  optionsSuccessStatus: 200,
  credentials: true,
};

router.use(cors(corsOptions));

module.exports = router;