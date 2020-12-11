const router = require('express').Router();

const cors = require('./cors');
const helmet = require('helmet');
const limiter = require('./rate-limit');
const bodyParser = require('./body-parser');


router.use(helmet());
router.use(cors);
router.use(bodyParser);
router.use(limiter);

module.exports = router;
