const router = require('express').Router();
const cors = require('cors');

const urlList = [
  'http://localhost:8080',
  'https://ogurtsovartem.github.io',
  'https://newsartemogurtsov.students.nomoreparties.xyz',
  'https://www.newsartemogurtsov.students.nomoreparties.xyz',
  'http://newsartemogurtsov.students.nomoreparties.xyz',
  'http://www.newsartemogurtsov.students.nomoreparties.xyz',
]
const corsOptions = {
  origin: function (origin, callback) {
    if(urlList.indexOf(origin) !== -1 || !origin){
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
    
  },
  credentials: true,
  allowedHeaders: 'Content-Type',
  optionsSuccessStatus: 200,
};

router.use(cors(corsOptions));

module.exports = router;