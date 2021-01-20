const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { getUser } = require('../controllers/users');

router.get('api/users/me', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().regex(/([a-zA-z]+)?\d+([a-zA-z]+)?/),
  }).unknown(true),
}), getUser);

module.exports = router;
