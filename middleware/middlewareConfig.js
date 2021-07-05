const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const middlewareConfig = server => {
  server.use(morgan('dev'));
  server.use(helmet());
  server.use(express.json());
};

module.exports = middlewareConfig;
