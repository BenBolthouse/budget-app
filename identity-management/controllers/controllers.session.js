const express = require('express');
const { NotImplemented } = require('@bbolt/http-errors');

const sessionController = express.Router();

sessionController.post('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

sessionController.get('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

sessionController.delete('/:id', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

module.exports = sessionController;
