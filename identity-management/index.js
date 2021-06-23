/**
 * Module configures express as a webserver
 */

const cookieParser = require('cookie-parser');
const cors = require('cors');
const csurf = require('csurf');
const express = require('express');
const { expressJsonErrorHandler } = require('@bbolt/http-errors');
const { httpLogger } = require('./config/logger');

const config = require('./config');
const { indexController, serviceControllers } = require('./controllers');

const app = express();

const { isProduction } = require('./config');

app.use(cookieParser());
app.use(csurf({
  cookie: {
    secure: isProduction,
    sameSite: isProduction && 'Lax',
    httpOnly: true,
  },
}));
app.use(express.json());
app.use(httpLogger);

if (isProduction) {
  app.use(cors);
}

app.use(`/api/v${config.service.version}`, serviceControllers);

// Index controller handles last-to-evaluate routes, must be last!
app.use(indexController);

app.use(expressJsonErrorHandler);

module.exports = app;
