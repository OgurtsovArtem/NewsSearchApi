/* eslint-disable object-curly-newline */
const Article = require('../models/article');
const NotFoundError = require('../erros/404-not-found-err');
const BadRequestError = require('../erros/400-bad-request-err');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      // eslint-disable-next-line no-constant-condition
      if (+[article] === 0) {
        throw new NotFoundError('Вы еще не сохранили ни одной статьи');
      }
      res.send({ data: article });
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    ownerId = req.user._id,
  } = req.body;
  Article.create({ keyword, title, text, date, source, link, image, owner: ownerId })
    .then(() => {
      res.send({ keyword, title, text, date, source, link, image });
    })
    .catch((err) => {
      if (err.keyword === 'ValidationError') {
        throw new BadRequestError('Переданы некорректные данные');
      }
    })
    .catch(next);
};

module.exports.deleteArticleId = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    // eslint-disable-next-line consistent-return
    .then((article) => {
      if (req.user._id.toString() !== article.owner.toString()) {
        return Promise.reject(new Error('notEnoughRights'));
      }
      Article.deleteOne({ _id: req.params.articleId })
        // eslint-disable-next-line no-shadow
        .then((article) => {
          res.send({ article });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'notEnoughRights') {
        // eslint-disable-next-line no-shadow
        const err = new Error('У вас недостаточно прав');
        err.statusCode = 403;
        next(err);
      } else {
        throw new NotFoundError('Ooops кажется такой статьи нет');
      }
    })
    .catch(next);
};
