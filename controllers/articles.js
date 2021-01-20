const Article = require('../models/article');
const { NotFoundError, BadRequestError, Forbidden } = require('../erros');
const { messages } = require('../config/massage');

module.exports.getArticles = (req, res, next) => {
  Article.find({owner: req.user._id})
    .then((article) => {
      // eslint-disable-next-line no-constant-condition
      if (!article) {
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
    .then((article) => {
      res.send({
        id: article._id,
        keyword: article.keyword,
        title: article.title,
        text: article.text,
        date: article.date,
        source: article.source,
        link: article.link,
        image: article.image,
      })
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
