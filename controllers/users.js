const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { NotFoundError, UnauthorizedError, ConflictingRequest } = require('../erros');
const { messages } = require('../config/massage');
const { createToken } = require('../config/token');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(messages.user.notFound);
      }
      res.send({ user: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, password, email } = req.body;
  User.init().then(() => {
    bcrypt.hash(password, 10)
      .then((hash) => User.create({ name, email, password: hash }))
      .then((user) => User.findById(user._id))
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new UnauthorizedError(messages.validation.incorrectData);
        } else if (err.code === 11000) {
          throw new ConflictingRequest(messages.registration.emailRegisteredErr);
        }
      })
      .catch(next);
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = createToken(user);
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch(() => {
      throw new UnauthorizedError(messages.validation.unauthorizedError);
    })
    .catch(next);
};
