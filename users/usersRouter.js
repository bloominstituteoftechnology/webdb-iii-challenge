const express = require('express');
const router = express.Router();

const {
  check,
  request,
  create,
  requestId,
  update,
  del,
} = require('./usersController');

router
  .route('/')
  .get(request)
  .post(check.user, create);

router
  .route('/:id')
  .get(check.id, requestId)
  .put(check.id, check.user, update)
  .delete(check.id, del);

module.exports = router;
