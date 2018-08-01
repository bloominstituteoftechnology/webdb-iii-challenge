const express = require('express');
const db = require('./data/db');
const tagrouter = express.Router();



tagrouter.get('/', (req, res) => {
        db('tags')
        .then(response => {
                res.status(200).json(response);
        })

        .catch(err => res.status(500).json({errorMessage: "Tags could not be retrieved from the database"}));

});


tagrouter.get('/:id', (req, res) => {

        const id = req.params.id;

        db('tags')
        .where('id',id)
        .then(response => {
                if(response.length ===0) res.status(404).json({message: "Tag with the specified ID does not exist." })
                else res.status(200).json(response);
        })

        .catch(err => res.status(500).json({errorMessage: "The tag with the specified id could not be retrieved from the database"}));

});

tagrouter.post('/', (req, res) => {
	//console.log(req.body);
        
	const {tag} = req.body;
	 //console.log(tag);

        if(!tag) res.status(400).json({errorMessage: "Please provide text for the tag"});

        else{

        const tagObj = {tag: tag};

        db.insert(tagObj)
        .into('tags')
        .then(ids => {
                const id= ids[0];
                res.status(200).json({id, ...tagObj});
        })

        .catch(err => res.status(500).json(err));
        }
});


tagrouter.delete('/:id', (req, res)=> {

        const id = req.params.id;
        console.log(id);

        if(isNaN(id)) res.status(400).json({errorMessage: "Id should be a number"});

        else{
         db('tags')
        .where('id', id)
        .del()
        .then(response => {

                if(response===1) {
                let responseObject ={};
                responseObject.message = `Successfully deleted tag with id ${id}`;

                res.status(200).json(responseObject);
                }

                else res.status(404).json({ errorMessage: "The tag with the specified ID does not exist."});
        })

        .catch(err => res.status(500).json({errorMessage: "There was a problem while deleting the tag"}));
        }
});


tagrouter.put('/:id', (req, res) => {

        const id = req.params.id;
        const tag = req.body.tag;

if (!tag) {
                res.status(400).json({errorMessage: "Please provide text for the tag to be updated."});
}

else{
        db('tags')
        .where('id', id)
        .update({
         tag: tag
        })

        .then(response => {
         if(response===0)  res.status(404).json({ message: "The tag  with the specified ID does not exist." });
        else{
              let responseObject ={};
              responseObject.message= `Successfully updated tag with  ${tag}`;
              res.status(200).json(responseObject);
            }
        })

        .catch(err => res.status(500).json(err));
}
});


module.exports = tagrouter;

