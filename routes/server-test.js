const router = require('express').Router();
const { messages } = require('../config/massage');

router.get('api/crash-test', () => {
  setTimeout(() => {
    throw new Error(messages.server.serverСrash);
  }, 0);
});

module.exports = router;
