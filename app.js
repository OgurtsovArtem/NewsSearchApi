require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const middlewares = require('./middlewares');
const routers = require('./routes');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { dataBaseLink, dataBaseConfig } = require('./config/database');
const { errHandler } = require('./middlewares/centralized-errors-handler');

const { PORT = 3000 } = process.env;
const app = express();

app.use(middlewares);

mongoose.connect(dataBaseLink, dataBaseConfig);

app.use(requestLogger);
app.use(routers);
app.use(errorLogger);
app.use(errors());
app.use(errHandler);
app.listen(PORT);

