const router = require('express').Router();
const cors = require('cors');

const corsOptions = {
  origin: ['https://ogurtsovartem.github.io', 'http://localhost:8080'],
  optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

module.exports = router;