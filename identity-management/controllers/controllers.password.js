const express = require('express');
const { NotImplemented } = require('@bbolt/http-errors');

const passwordController = express.Router();

passwordController.post('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

passwordController.get('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

passwordController.get('/:id', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

passwordController.patch('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

passwordController.put('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

passwordController.delete('/:id', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

module.exports = passwordController;
