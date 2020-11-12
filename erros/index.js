const BadRequestError = require('./400-bad-request-err');
const UnauthorizedError = require('./401-unauthorized-err');
const Forbidden = require('./403-forbidden');
const NotFoundError = require('./404-not-found-err');
const ConflictingRequest = require('./409-conflicting-request');

module.exports = {
  BadRequestError,
  UnauthorizedError,
  Forbidden,
  NotFoundError,
  ConflictingRequest,
};
