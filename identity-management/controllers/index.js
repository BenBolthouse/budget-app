const express = require('express');
const { NotFound } = require('@bbolt/http-errors');

const config = require('../config');
const sessionController = require('./controllers.session');
const userController = require('./controllers.user');
const roleController = require('./controllers.role');
const claimController = require('./controllers.claim');
const emailController = require('./controllers.email');
const passwordController = require('./controllers.password');

/**
 * Index controller handles requests that are always last to evaluate, including
 * a route for catching all 404 requests.
 */
const serviceControllers = express.Router();
const indexController = express.Router();

serviceControllers.use('/session', sessionController);
serviceControllers.use('/users', userController);
serviceControllers.use('/roles', roleController);
serviceControllers.use('/claims', claimController);
serviceControllers.use('/emails', emailController);
serviceControllers.use('/passwords', passwordController);

// Returns details about the service
indexController.get('/about', (req, res, next) => {
  return res.json({
    url: `${config.service.schema}://${config.service.host}`,
    name: config.service.name,
    version: config.service.version,
  }, 200);
});

indexController.get('/*', (req, res, next) => {
  throw new NotFound('', {
    message: 'The requested resource was not found.',
    url: req.originalUrl,
  });
});

module.exports = { serviceControllers, indexController };
