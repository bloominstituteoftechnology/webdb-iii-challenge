const express = require('express');
const postrouter = express.Router();
const db = require('./data/db');



postrouter.get('/', (req, res) => {
	db('posts')
        .then(response => {
                res.status(200).json(response);
        })

        .catch(err => res.status(500).json(err));

});


module.exports = postrouter;
