/**
 * Module configures express as a webserver
 */

const cookieParser = require('cookie-parser');
const cors = require('cors');
const csurf = require('csurf');
const express = require('express');
const { httpLogger } = require('./config/logger');
const controllers = require('./controllers');

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

app.use(controllers);

module.exports = app;
