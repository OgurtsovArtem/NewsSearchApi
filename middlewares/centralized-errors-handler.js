module.exports.errHandler = (err, req, res, next) => {
  const { statusCode = 500, message = 'Что-то пошло не так' } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
};
