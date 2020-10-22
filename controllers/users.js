const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../erros/404-not-found-err');
const UnauthorizedError = require('../erros/401-unauthorized-err');

const { NODE_ENV, JWT_SECRET = 'secret-key' } = process.env;

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь не найден');
      }

      res.send({ user: user.name, email: user.email });
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  // eslint-disable-next-line object-curly-newline
  const { name, password, email } = req.body;
  User.init().then(() => {
    bcrypt.hash(password, 10)
      // eslint-disable-next-line object-curly-newline
      .then((hash) => User.create({ name, email, password: hash }))
      .then((user) => User.findById(user._id))
      .then((user) => res.send({ data: user }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new UnauthorizedError('Переданы некорректные данные');
        } else if (err.code === 11000) {
          // eslint-disable-next-line no-shadow
          const err = new Error('Данный Email уже зарегистрирован');
          err.statusCode = 409;
          next(err);
        }
      })
      .catch(next);
  });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: true,
      });
      res.send({ token });
    })
    .catch((err) => {
      throw new UnauthorizedError(err.message);
    })
    .catch(next);
};
