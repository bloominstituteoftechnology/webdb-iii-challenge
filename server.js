const express = require('express');
const bodyParser = require('body-parser');

const server = express();

const knex = require('./database/db.js')

server.use(bodyParser.json());

// endpoints here
server.get('/', (req,res) => {
    res.status(200).json({success: true})
})
//users

async function createUser(req, res) {
    const user = req.body;
    try {
        const addedUser = await knex.insert(user).into('Users');
        res.status(201).json({addedUser});
    } catch (error) {
        res.status(500).json({ errorMessage: 'Could not insert the User' });
    }
    // knex 
    //     .insert(user)
    //     .into('Users')
    //     .then(user => {
    //         res.status(201).json({user});
    //     })
    //     .catch(error => {
    //         res.status(500).json({ errorMessage: 'Could not insert the User' });
    //     })
}
server.post('/users', createUser);

server.get('/users', (req,res) => {
    knex.select().from('Users')
        .then(allusers => {
            res.status(201).json({allusers});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not get the Users' });
        })
})

server.get('/users/:id', (req,res) => {
    const {id} = req.params;
    knex.select().from('Users').where('id',id)
        .then(allusers => {
            res.status(201).json({allusers});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not get the User' });
        })
})
server.get('/users/:id/posts', (req,res) => {
    const {id} = req.params;
    knex.select().from('Posts').where('userId',id)
        .then(posts => {
            res.status(201).json({posts});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not get the postss' });
        })
})


server.put('/users/:id', (req,res) => {
    const {id} = req.params;
    const {name} = req.body;
    knex.from('Users').where('id',id).update({name:name})
        .then(updated => {
            res.status(201).json({updated});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not update the Users' });
        })
})

server.delete('/users/:id', (req,res) => {
    const {id} = req.params;
    knex.from('Users').where('id',id).del()
        .then(result => {
            res.status(201).json({result});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not delete the User' });
        })
})

///posts 
async function createPost(req, res) {
    const post = req.body;
    try {
        const addedpost = await knex.insert(post).into('Posts');
        res.status(201).json({addedpost});
    } catch (error) {
        res.status(500).json({ errorMessage: 'Could not insert the post' });
    }
}

server.post('/posts', createPost);

server.get('/posts', (req,res) => {
    knex.select().from('Posts')
        .then(allposts => {
            res.status(201).json({allposts});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not get the Posts' });
        })
})

server.get('/posts/:id', (req,res) => {
    const {id} = req.params;
    knex.select().from('Posts').where('id',id)
        .then(post => {
            res.status(201).json({post});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not get the Post' });
        })
})

server.put('/posts/:id', (req,res) => {
    const {id} = req.params;
    const {text} = req.body;
    knex.from('Posts').where('id',id).update({text:text})
        .then(updated => {
            res.status(201).json({updated});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not update the Users' });
        })
})

server.delete('/posts/:id', (req,res) => {
    const {id} = req.params;
    knex.from('Posts').where('id',id).del()
        .then(result => {
            res.status(201).json({result});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not delete the post' });
        })
})

///tags 
async function createTag(req, res) {
    const tag = req.body;
    try {
        const addedtag = await knex.insert(tag).into('Tags');
        res.status(201).json({addedtag});
    } catch (error) {
        res.status(500).json({ errorMessage: 'Could not insert the tag' });
    }
}

server.post('/tags', createTag);

server.get('/tags', (req,res) => {
    knex.select().from('Tags')
        .then(alltags => {
            res.status(201).json({alltags});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not get the tags' });
        })
})

server.get('/tags/:id', (req,res) => {
    const {id} = req.params;
    knex.select().from('Tags').where('id',id)
        .then(tag => {
            res.status(201).json({tag});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not get the tag' });
        })
})

server.put('/tags/:id', (req,res) => {
    const {id} = req.params;
    const {tag} = req.body;
    knex.from('Tags').where('id',id).update({tag:tag})
        .then(updated => {
            res.status(201).json({updated});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not update the Users' });
        })
})

server.delete('/tags/:id', (req,res) => {
    const {id} = req.params;
    knex.from('Tags').where('id',id).del()
        .then(result => {
            res.status(201).json({result});
        })
        .catch(error => {
            res.status(500).json({ errorMessage: 'Could not delete the tag' });
        })
})




const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});