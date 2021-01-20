const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);
const { login, createUser } = require('../controllers/users');

router.post('/api/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().regex(/^[^ ]*$/).min(8),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: true } }),
  }),
}), createUser);

router.post('/api/signin', celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: true } }),
  }),
}), login);

module.exports = router;
