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

postrouter.post('/', (req, res) => {

        const {text, userId} = req.body;
        const post = {text, userId};

        if (!text || !userId) {
                res.status(400).json({errorMessage: "Please provide text and userId for the post."});
        }

        else if(isNaN(parseInt(userId))){
                res.status(400).json({errorMessage: "Please provide a number for userId."});
        }

        else{

	db.insert(post)
        .into('posts')
        .then(ids => {
                const id= ids[0];
		const message ="Successfully added a new post";
                res.status(200).json({id, ...post, message});
        })


        .catch(error => {
        res.status(500).json({ message: "There was an error while saving the post to the database" });
        })
	}
});


postrouter.delete('/:id', (req, res) => {
        const id = req.params.id;
        
	db('posts')
	.where('id', id)
	.del()
	.then(response => {
                if(response===1) {
              
                res.status(200).json({message: `Successfully deleted post with id ${id}`});
                }

                else res.status(404).json({ error: "The post with the specified ID does not exist." });
        })

        .catch(error => {
        res.status(500).json({ error: "The post could not be removed" });
        })

  });

module.exports = postrouter;
