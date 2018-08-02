const codes = require("./../data/statusCodes");

const express = require("express");
const db = require("../data/dbConfig.js");
const router = express.Router();

router.get("/", (req, res, next) => {
  db("users")
    .then(response => {
      res.status(codes.OK).json(response);
    })
    .catch(err => {
      next(err);
    });
});
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  db("users")
    .where("id", id)
    .then(response => {
      if (response.length === 0) {
        throw {
          code: codes.NOT_FOUND,
          message: "User with that id does not exist"
        };
      }
      res.status(codes.OK).json(response);
    })
    .catch(err => {
      next(err);
    });
});
router.get("/:id/posts", (req, res, next) => {
  const { id } = req.params;
  db('posts')
  .join('users', 'users.id', '=', 'posts.userId')
  .select('posts.*', 'users.*')
  .where('posts.userId', id)
    .then(response => {
      res.status(codes.OK).json(response);
    })
    .catch(err => {
      next(err);
    });
});
router.post("/", (req, res, next) => {
  db("users")
    .insert(req.body)
    .then(response => {
      res.status(codes.CREATED).json(response);
    })
    .catch(err => {
      next(err);
    });
});
router.put("/:id", (req, res, next) => {
  const { id } = req.params;
  db("users")
    .where("id", id)
    .update(req.body)
    .then(response => {
      res.status(codes.OK).json(response);
    })
    .catch(err => {
      next(err);
    });
});
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  db("users")
    .where("id", id)
    .del()
    .then(response => {
      if (response === 0) {
        throw {
          code: codes.NOT_FOUND,
          message: "User does not exist with that id"
        };
      }
      res.status(codes.OK).json(response);
    })
    .catch(err => {
      next(err);
    });
});
module.exports = router;
