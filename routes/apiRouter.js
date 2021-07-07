const express = require('express');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const tagRoutes = require('./tagRoutes');

const api = express.Router();

api.get('/', (req,res) => {
    res.send('Welcome to the API!')
})

api.use('/users', userRoutes);
api.use('/posts', postRoutes);
api.use('/tags', tagRoutes);

module.exports = api;