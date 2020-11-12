const { messages } = require('../config/massage');
const { UnauthorizedError } = require('../erros');
const { verifyToken } = require('../config/token');

const handleAuthError = () => {
  throw new UnauthorizedError(messages.auth.authError);
};

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return handleAuthError(res);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = verifyToken(token);
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = payload;

  return next();
};
