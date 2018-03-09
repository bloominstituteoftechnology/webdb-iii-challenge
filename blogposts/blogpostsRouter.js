const express = require('express');
const router = express.Router();

const {
  check,
  request,
  create,
  requestId,
  update,
  del,
} = require('./blogpostsController');

router
  .route('/')
  .get(request)
  .post(check.blogpost, check.refIds, create);

router
  .route('/:id')
  .get(check.id, requestId)
  .put(check.id, update)
  .delete(check.id, del);

module.exports = router;
