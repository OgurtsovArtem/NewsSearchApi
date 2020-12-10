const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: ['https://ogurtsovartem.github.io', 'http://localhost:8080'],
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: 'Content-Type, Coockie'
};

router.use(cors(corsOptions));

module.exports = router;