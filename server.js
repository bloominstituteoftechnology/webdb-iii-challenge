const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./data/db');


const server = express();

server.use(express.json());

server.use(morgan('dev'));

server.get('/', (req, res) => {
        res.send('Testing');
});

server.get('/api/users', (req, res) => {
	db('users')
	.then(response => {
		res.status(200).json(response);
	})

	.catch(err => res.status(500).json(err));

});


server.post('/api/users', (req, res) => {
	const user = req.body;

	db.insert(user)
	.into('users')
	.then(ids => {
		const id= ids[0];
		res.status(200).json({id, ...user});
	})
	
	.catch(err => res.status(500).json(err));

});

server.delete('/api/users/:id', (req, res)=> {
	console.log(req.params.id);
	const id = req.params.id; 
	
	 db('users')
	.where('id', id)
	.del()	
	.then(response => {
		
		if(response===1) {
                let responseObject ={};
                responseObject.message = `Successfully deleted post with id ${id}`;

                res.status(200).json(responseObject);
                }

		else res.status(404).json({ error: "The post with the specified ID does not exist."});
	})
	
	.catch(err => res.status(500).json(err));

});



server.listen(5000, () => console.log('API running on port 5000'));
