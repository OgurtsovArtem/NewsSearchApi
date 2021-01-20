const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
Joi.objectId = require('joi-objectid')(Joi);

const {
  getArticles,
  createArticle,
  deleteArticleId,
} = require('../controllers/articles');

router.get('/api/articles', celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required().regex(/([a-zA-z]+)?\d+([a-zA-z]+)?/),
  }).unknown(true),
}), getArticles);

router.post('/api/articles', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(/^[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?$/),
    image: Joi.string().required().regex(/^[-a-zA-Z0-9@:%_+.~#?&/=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_+.~#?&/=]*)?$/),
    owner: Joi.objectId(),
  }),
  headers: Joi.object().keys({
    authorization: Joi.string().required().regex(/([a-zA-z]+)?\d+([a-zA-z]+)?/),
  }).unknown(true),
}), createArticle);

router.delete('/api/articles/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().length(24).hex(),
  }).unknown(true),
  headers: Joi.object().keys({
    authorization: Joi.string().required().regex(/([a-zA-z]+)?\d+([a-zA-z]+)?/),
  }).unknown(true),
}), deleteArticleId);

module.exports = router;
