/* eslint-disable linebreak-style */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { router } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, DB_ADDRESS } = require('./config');

const app = express();
app.use(bodyParser.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

async function main() {
  await mongoose.connect(DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  await app.listen(PORT);
}

main();
