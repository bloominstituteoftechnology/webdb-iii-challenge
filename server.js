const express = require('express');

const server = express();

const db = require('./data/db')

//middleware
server.use(express.json());

function sendError(code, message, error) {
    return {
        code: code,
        message: message,
        error: error
    }
}

// =================================== USERS ENDPOINTS ================================== 
server.get('/', (req, res) => {
    res.send('Welcome to Lambda Forum')
})

server.get('/users', async (req, res, next) => {
    try {
        const response = await(db('Users').select());
        res.status(200).json(response);
    } catch(error) {
        next(sendError(500, 'Failed to get users information.', error.message))
    }
})

server.get('/users/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await(db('Users').where({id: Number(id)}));
        if (response.length === 0) {
            return next(sendError(404, 'Failed to retrieve user information', 'The user for this specific id does not exist.'))
        }
        res.status(200).json(response[0]);
    } catch(error) {
        next(sendError(500, 'Failed to get user information.', error.message))
    }
})

server.post('/users', async (req, res, next) => {
    if (!req.body.name) {
        return next(sendError(400, 'Failed to add user to database.', 'Please provide user name.'))
    }

    const newUser = req.body;

    try {
        const response = await (db('Users').insert(newUser));
        const id = response[0];
        res.status(201).json({id, ...newUser});
    } catch(error) {
        next(sendError(500, 'Failed to add user to database.', error.message))
    }
})

server.delete('/users/:id', async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await(db('Users').select().where('id', Number(id)));
        const response = await(db('Users').where('id', id).del());
        if (response === 0) {
            return next(sendError(404, 'Failed to remove user.', 'The user for this specific id does not exist.'))
        }
        res.status(200).json(user[0]);
    } catch(error) {
        next(sendError(500, 'Failed to remove user.', error.message))
    }
})

server.put('/users/:id', async (req, res, next) => {
    if (!req.body.name) {
        return next(sendError(400, 'Failed to update user.', 'Please provide user name.'))
    }
    
    const id = req.params.id;
    const changes = req.body;
    
    try {
        const response = await(db('Users').where('id', id).update(changes));
        const user = await(db('Users').where('id', Number(id)));
        if (response === 0) {
            return next(sendError(404, 'Failed to update user', 'The user for this specific id does not exist.'))
        }
        res.status(200).json(user);
    } catch(error) {
        next(sendError(500, 'Failed to update user.', error.message))
    }
})

server.get('/users/:id/posts', async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await(db('Posts').where({userid: Number(id)}));
        if (response.length === 0) {
            return next(sendError(404, 'Failed to retrieve posts for this user', 'The user for this specific id does not exists or there is no post by this user.'))
        }
        res.status(200).json(response);
    } catch(error) {
        next(sendError(500, 'Failed to retrieve posts for this user.', error.message))
    }
})

// =================================== POSTS ENDPOINTS ================================== 
server.get('/posts', async (req, res, next) => {
    try {
        const response = await(db('Posts').select());
        res.status(200).json(response);
    } catch(error) {
        next(sendError(500, 'Failed to get posts information.', error.message))
    }
})

server.get('/posts/:id', async (req, res, next) => {
    const id = req.params.id;
    const getPostQuery = db('Posts as p').select('p.id', 'u.name as username', 'p.text', 'p.createdAt')
                                         .leftJoin('Users as u', 'p.userid', 'u.id')
                                         .where('p.id', '=', Number(id));
    
    const getTagQuery = db('Posts as p').select('t.tag')
                                       .join('PostTags as pt', 'p.id', 'pt.postid')
                                       .join('Tags as t', 't.id', 'pt.tagid')
                                       .where('p.id', '=', Number(id));

    try {
        const postRes = await(getPostQuery);
        const tagRes = await(getTagQuery);
        if (postRes.length === 0) {
            return next(sendError(404, 'Failed to retrieve post information', 'The post for this specific id does not exist.'))
        }

        let post = postRes[0];
        post.tag = tagRes.length > 0 ?
                   tagRes.map(tag => tag.tag) : []

        res.status(200).json(post);
    } catch(error) {
        next(sendError(500, 'Failed to get post information.', error.message))
    }
})

server.post('/posts', async (req, res, next) => {
    if (!(req.body.text && req.body.userid)) {
        return next(sendError(400, 'Failed to add post to database.', 'Please provide userid and text for post.'))
    }

    try {
        const response = await (db('Posts').insert(req.body));
        const id = response[0];
        const newPost = await(db('Posts').where({ id }));
        res.status(201).json(newPost[0]);
    } catch (error) {
        next(sendError(500, 'Failed to add post to database.', error.message))
    }
})

server.delete('/posts/:id', async (req, res, next) => {
    const id = Number(req.params.id);

    try {
        const post = await(db('Posts').where({ id }));
        const response = await(db('Posts').where({ id }).del());
        if (response === 0) {
            return next(sendError(404, 'Failed to remove post.', 'The post for this specific id does not exist.'))
        }
        res.status(200).json(post[0]);
    } catch(error) {
        next(sendError(500, 'Failed to remove post.', error.message))
    }
})

server.put('/posts/:id', async (req, res, next) => {
    if ((!req.body.text && !req.body.userid)) {
        return next(sendError(400, 'Failed to update post.', 'Please provide userid and text for post.'))
    }
    
    const id = Number(req.params.id);
    const changes = req.body;
    console.log(changes);
    try {
        const response = await(db('Posts').where({ id }).update(changes));
        const post = await(db('Posts').where({ id }));
        if (!response) {
            return next(sendError(404, 'Failed to update post', 'The post for this specific id does not exist.'))
        }
        res.status(200).json(post);
    } catch(error) {
        next(sendError(500, 'Failed to update post.', error.message))
    }
})
// =================================== TAGS ENDPOINTS ================================== 
server.get('/tags', async (req, res, next) => {
    try {
        const response = await (db('Tags').select());
        res.status(200).json(response);
    } catch (error) {
        next(sendError(500, 'Failed to get tags information.', error.message))
    }
})

server.get('/tags/:id', async (req, res, next) => {
    const id = Number(req.params.id);

    try {
        const response = await (db('Tags').where({ id }));

        if (response.length === 0) {
            return next(sendError(404, 'Failed to retrieve tags information', 'The tag for this specific id does not exist.'))
        }

        res.status(200).json(response);
    } catch (error) {
        next(sendError(500, 'Failed to get tag information.', error.message))
    }
})

server.post('/tags', async (req, res, next) => {
    if (!req.body.tag) {
        return next(sendError(400, 'Failed to save tag to database.', 'Please provide tag name.'))
    }

    try {
        const response = await (db('Tags').insert(req.body));
        const id = response[0];
        const newTag = await (db('Tags').where({ id }));
        res.status(200).json(newTag);
    } catch (error) {
        next(sendError(500, 'Failed to save tag to database.', error.message))
    }
})

server.delete('/tags/:id', async (req, res, next) => {
    const id = Number(req.params.id);

    try {
        const tag = await (db('Tags').where({ id }));
        if (!tag) {
            return next(sendError(404, 'Failed to remove tag.', 'The tag for this specific id does not exist.'))
        }

        await (db('Tags').where({ id }).del());
        res.status(200).json(tag);
    } catch (errore) {
        next(sendError(500, 'Failed to remove tag.', error.message))
    }
})

server.put('/tags/:id', async (req, res, next) => {
    if (!req.body.tag) {
        return next(sendError(400, 'Failed to save tag to database.', 'Please provide tag name.'))
    }

    const id = Number(req.params.id);
    const changes = req.body;
    try {
        const response = await (db('Tags').where({ id }).update(changes));
        if (!response) {
            return next(sendError(404, 'Failed to update tag.', 'The tag for this specific id does not exist.'))
        } else {
            const newTag = await db('Tags').where({ id });
            res.status(200).json(newTag);
        }
    } catch (error) {
        next(sendError(500, 'Failed to update tag.', error.message))
    }
})

// ========================== Error Handler ===========================
server.use((err, req, res, next) => {
    res.status(err.code).send({message: err.message, error: err.error})
})

const port = 8000;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});