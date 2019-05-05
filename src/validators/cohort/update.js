const express = require('express');
const ValidationError = require('../validationError'); 

module.exports = {
  name: ({name}) => {
      if (name === undefined || name === '' || typeof name != "string") {
          throw new ValidationError('Invalid project name.');
      }
        return true;
  }
};