const express = require('express');
const { NotImplemented } = require('@bbolt/http-errors');

const userController = express.Router();

userController.post('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

userController.get('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

userController.get('/:id', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

userController.patch('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

userController.put('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

userController.delete('/:id', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

module.exports = userController;
