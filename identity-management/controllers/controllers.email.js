const express = require('express');
const { NotImplemented } = require('@bbolt/http-errors');

const emailController = express.Router();

emailController.post('/', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

emailController.get('/', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

emailController.get('/:id', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

emailController.patch('/', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

emailController.put('/', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

emailController.delete('/:id', (req, res, next) => {
  throw new NotImplemented('', { message: 'Route not yet implemented' });
});

module.exports = emailController;
