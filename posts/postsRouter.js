const express = require('express');
const router = express.Router();

const {
  check,
  request,
  create,
  requestId,
  requestTags,
  update,
  del,
} = require('./postsController');

router
  .route('/')
  .get(request)
  .post(check.post, create);

router
  .route('/:id')
  .get(check.id, requestId)
  .put(check.id, update)
  .delete(check.id, del);

router.route('/:id/tags').get(check.id, requestTags);

module.exports = router;
