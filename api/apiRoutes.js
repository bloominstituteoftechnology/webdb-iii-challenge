const express = require('express');

const usersRoutes = require('./usersRoutes');
const postsRoutes = require('./postsRoutes');
const tagsRoutes = require('./tagsRoutes');

const api = express.Router();

api.use('/users', usersRoutes);
api.use('/posts', postsRoutes);
api.use('/tags', tagsRoutes);

module.exports = api;