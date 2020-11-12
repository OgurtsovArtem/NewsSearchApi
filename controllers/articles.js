const Article = require('../models/article');
const { NotFoundError, BadRequestError, Forbidden } = require('../erros');
const { messages } = require('../config/massage');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .then((article) => {
      // eslint-disable-next-line no-constant-condition
      if (+[article] === 0) {
        throw new NotFoundError(messages.article.noArticlesSaved);
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
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: ownerId,
  })
    .then(() => {
      res.send({
        keyword,
        title,
        text,
        date,
        source,
        link,
        image,
      });
    })
    .catch((err) => {
      if (err.keyword === 'ValidationError') {
        throw new BadRequestError(messages.article.incorrectData);
      }
    })
    .catch(next);
};

module.exports.deleteArticleId = (req, res, next) => {
  Article.findById(req.params.articleId).select('+owner')
    // eslint-disable-next-line consistent-return
    .then((articles) => {
      if (req.user._id.toString() !== articles.owner.toString()) {
        return Promise.reject(new Error('notEnoughRights'));
      }
      Article.deleteOne({ _id: req.params.articleId })
        .then((article) => {
          res.send({ article });
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.message === 'notEnoughRights') {
        throw new Forbidden(messages.article.notEnoughRights);
      } else {
        throw new NotFoundError(messages.article.notFound);
      }
    })
    .catch(next);
};
