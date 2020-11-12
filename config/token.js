const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET = 'secret-key' } = process.env;

const key = NODE_ENV === 'production' ? JWT_SECRET : 'secret-key';

const createToken = (user) => jwt.sign(
  { _id: user._id },
  NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
  { expiresIn: '7d' },
);

const verifyToken = (token) => jwt.verify(token, key);

module.exports = {
  createToken,
  verifyToken,
};
