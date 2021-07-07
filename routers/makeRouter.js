const { Router } = require('express');
const wrapAsync = require('../utilities/wrapAsync');
const errors = require('../errors');

const { HttpError } = errors;

function postRouter(db, target, middlewares = []) {
  const router = Router();

  router.get(
    '/:id',
    wrapAsync(async (req, res, next) => {
      const { id } = req.params;
      const payload = await db
        .select()
        .from(target)
        .where('id', id);

      if (payload.length === 0) {
        throw new HttpError(errors.noResult);
      } else {
        res.status(200);
        req.locals = { ...req.locals, payload: payload[0], type: target };
      }
      next();
    }),
  );

  router.get(
    '/',
    wrapAsync(async (req, res, next) => {
      const payload = await db(target);
      if (payload.length === 0) {
        throw new HttpError(errors.noResult);
      } else {
        res.status(200);
        req.locals = { ...req.locals, payload, type: target };
        next();
      }
    }),
  );

  router.post(
    '/',
    wrapAsync(async (req, res, next) => {
      const payload = await db(target).insert(req.body);
      res.status(201);
      req.locals = { ...req.locals, payload, type: 'id' };
      next();
    }),
  );

  router.delete(
    '/:id',
    wrapAsync(async (req, res, next) => {
      const { id } = req.params;
      const payload = await db(target)
        .where('id', id)
        .del();
      if (payload === 0) {
        throw new HttpError(errors.noEffect);
      } else {
        res.status(200);
        req.locals = { ...req.locals, payload, type: 'number' };
      }
      next();
    }),
  );

  router.put(
    '/:id',
    wrapAsync(async (req, res, next) => {
      const { id } = req.params;
      const payload = await db(target)
        .where('id', id)
        .update(req.body);
      if (payload === 0) {
        throw new HttpError(errors.noEffect);
      } else {
        res.status(200);
        req.locals = { ...req.locals, payload, type: 'number' };
      }
      next();
    }),
  );

  router.use(...middlewares, (req, res, next) => {
    if (req.locals.payload !== undefined) {
      res.json(req.locals.payload);
    }
    next();
  });

  return router;
}

module.exports = postRouter;
