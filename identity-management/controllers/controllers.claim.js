const express = require('express');
const { NotImplemented } = require('@bbolt/http-errors');

const claimController = express.Router();

claimController.post('/', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

claimController.get('/', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

claimController.get('/:id', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

claimController.patch('/', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

claimController.put('/', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

claimController.delete('/:id', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

module.exports = claimController;
