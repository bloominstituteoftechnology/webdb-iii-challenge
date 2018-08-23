const express = require('express');

const knex = require('knex');

const knexConfig = require('./knexfile');

//We can use the db constant to interact with our database.
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());


// Implement the following endpoints:

// Users
// [POST] /users This route should save a new user to the database.
// [GET] /users This route will return an array of all users.
// [GET] /users/:id This route will return the user with the matching id.
// [GET] /users/:id/posts returns all posts for the user with the specified id.
// [PUT] /users/:id This route will update the user with the matching id using information sent in the body of the request.
// [DELETE] /users/:id This route should delete the specified user.
// Posts
// [POST] /posts This route should save a new post to the database.
// [GET] /posts This route will return an array of all posts.
// [GET] /posts/:id This route will return the post with the matching id.
// [PUT] /posts/:id This route will update the post with the matching id using information sent in the body of the request.
// [DELETE] /posts/:id This route should delete the specified post.
// Tags
// [POST] /tags This route should save a new tag to the database.
// [GET] /tags This route will return an array of all tags
// [GET] /tags/:id This route will return the tag with the matching id.
// [PUT] /tags/:id This route will update the tag with the matching id using information sent in the body of the request.
// [DELETE] /tags/:id This route should delete the specified tag.
// Extra Credit
// add a [GET] /posts/:id/tags endpoint that returns all tags for the post with the specified id.
// have the post returned by the [GET] /posts/:id endpoint include the user name(not the id) and the tags associated with the post.

server.get('/users',(req,res) => {
    
    db('users')
        .select().table('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});


server.get('/users/:id', (req,res) => {
    const id = req.params.id; //// or we could destructure it like so: const { id } = req.params;
    db('users')
        .where({id:id})
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

// server.get('/users/:id/posts', (req,res) => {
//     const {id} = req.params;

// })

server.post('/users', (req,res) => {
    const user = req.body;
    //We’re using the .insert().into() methods found in the knex instance to add our user to the users table. 
    // Note that even when inserting several records at the same time only one id is returned.
    //To insert multiple records, all we need to do is pass an array instead of an object to our .insert() method.
    db.insert(user)
        .into('users')
        .then(ids => {
            res.status(201).json(ids[0]); // responds with the id of the last record inserted
        })
        .catch(err => {
            res.status(500).json(err);
        })
});


server.put('/users/:id', (req,res) => {
    //There is no need to pass all of the fields for the record, only the fields that need to change and Knex will leave all other fields unchanged. It will do the right thing.
    const changes = req.body;
    const {id} = req.params;

    db('users') //gets point knex to the users table 
        //using .where(condition) we can pick the exact record we intend to update
        .where('id', '=', id) //or .where({ id: id })
        // After we have the reference to the record we want to update, we call .update() passing an object with the changes that need to be applied.
        .update(changes)
        .then(count => {
            // count === number of records updated
            // If knex cannot find any records that match the search criteria then zero (0) will be returned.
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//Calling .del() without first filtering the records will result on the removal of all the records in the table, be careful!
server.delete('/users/:id', (req,res) => {
    const {id} = req.params;

    db('users')
        .where({id}) // or .where(id, '=', id)
        .del()
        .then(count=> {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})




// Posts
// [POST] /posts This route should save a new post to the database.
// [GET] /posts This route will return an array of all posts.
// [GET] /posts/:id This route will return the post with the matching id.
// [PUT] /posts/:id This route will update the post with the matching id using information sent in the body of the request.
// [DELETE] /posts/:id This route should delete the specified post.

server.get('/posts', (req,res) => {
    db('posts')
        .select()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

server.get('/posts/:id', (req,res) => {
    const {id} = req.params;
    db('posts')
        .where({id:id})
        .select()
        .then(ids => {
            res.status(200).json(ids[0])
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

server.post('/posts', (req,res) => {
    let post = req.body;
    
    db.insert(post)
        .into('posts')
        .then(ids => {
            res.status(201).json(ids[0])
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

server.put('/posts/:id', (req,res) => {
    const changes = req.body;
    const {id} = req.params;

    db('posts')
        .where({id:id})
        .update(changes)
        .then(count => {
            res.status(200).json(count);
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

server.delete('/posts/:id', (req,res) => {
    const {id} = req.params;

    db('posts')
        .where({id})
        .del()
        .then(count => {
            res.status(200).json(count);  //Q????????????????: Why is the response that I'm getting 'OK'. Shouldn't I be getting the number of records that were deleted?
        })
        .catch(err => {
            res.status(500).json(err);
        })
})


// Tags
// [POST] /tags This route should save a new tag to the database.
// [GET] /tags This route will return an array of all tags
// [GET] /tags/:id This route will return the tag with the matching id.
// [PUT] /tags/:id This route will update the tag with the matching id using information sent in the body of the request.
// [DELETE] /tags/:id This route should delete the specified tag.


server.get('/tags', (req,res) => {
    db('tags')
        .select()
        .then(tags => {
            res.statusMessage(200).json(tags)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})


server.listen(8000, () => console.log('Running on port 8000'));