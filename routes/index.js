const router = require('express').Router();

const routerUsers = require('./users');
const routerArticles = require('./articles');
const routerSingInUp = require('./sing-in-up');
const routerTest = require('./server-test');
const { auth } = require('../middlewares/auth');
const { NotFoundError } = require('../erros');
const { messages } = require('../config/massage');

router.use('/', routerTest);
router.use('/', routerSingInUp);
router.use(auth);
router.use('/', routerArticles);
router.use('/', routerUsers);

router.use('*', () => {
  throw new NotFoundError(messages.validation.notFound);
});

module.exports = router;
