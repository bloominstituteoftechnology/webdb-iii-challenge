const express = require('express');
const ValidationError = require('../validationError'); 

module.exports = {
	name: ({name}) => {
    if (name === undefined || name === '' || typeof name != "string") {
      throw new ValidationError('Requires valid student name.');
    }
    return true;
	},
  cohort_id: ({cohort_id}) => {
    if (cohort_id === undefined || typeof cohort_id != 'number'){
      throw new ValidationError('Student must have a valid cohort_id ID.');
    }
    return true;
  }
};