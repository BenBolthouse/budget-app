const express = require('express');
const { NotImplemented } = require('@bbolt/http-errors');

const roleController = express.Router();

roleController.post('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

roleController.get('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

roleController.get('/:id', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

roleController.patch('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

roleController.put('/', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

roleController.delete('/:id', (req, res, next) => {
  throw new NotImplemented({ message: 'Route not yet implemented' });
});

module.exports = roleController;
