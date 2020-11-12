const { NODE_ENV, MONGO_SERVER } = process.env;

const dataBaseLink = NODE_ENV === 'production' ? MONGO_SERVER : 'mongodb://localhost:27017/NewsSearchBd';

const dataBaseConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  dataBaseLink,
  dataBaseConfig,
};
