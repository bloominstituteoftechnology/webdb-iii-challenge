const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());
const PORT = 3000;
/* prettier-ignore */
const { usersConstraints, postsConstraints, tagsConstraints, posttagsConstraints } = 
  require('./middleware');
const errors = require('./middleware/errors');

// endpoints here
server.get('/', (req, res) => {
  res.send('working...');
});

/* 
  USERS
*/

// add a user
server.post('/api/users', usersConstraints, async (req, res) => {
  const NAME = req.body.name;
  const newUser = { name: NAME };

  try {
    const users = await db.insert(newUser).into('users');
    // returns an array, we want the first one
    res.status(201).json({ message: `Succesfully added user id:${users[0]}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all users
server.get('/api/users', async (req, res) => {
  try {
    const users = await db('users');
    if (users.length === 0) {
      res.status(200).json({ message: 'There are currently no users' });
    } else {
      res.status(200).json(users);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a user
server.get('/api/users/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const users = await db
      .where('id', ID)
      .from('users')
      .first();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json({ error: `No user with id:${ID} exists.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// gets all of a user's posts
server.get('/api/users/:id/posts', async (req, res) => {
  const ID = req.params.id;

  try {
    const posts = await db
      .where('userId', ID)
      .from('posts')
      .first();
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ error: `No posts for user id:${ID} exist.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit a user
server.put('/api/users/:id', usersConstraints, async (req, res) => {
  const ID = req.params.id;
  const NAME = req.body.name;
  const modifiedUser = { name: NAME };

  try {
    const users = await db
      .where('id', ID)
      .from('users')
      .first();
    if (users) {
      try {
        const user = await db
          .where('id', ID)
          .from('users')
          .update(modifiedUser);
        if (user) {
          res.status(200).json({ message: `Updated user id:${ID}` });
        } else {
          res.status(500).send(`impossible error updating user id:${ID}`);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json({ error: `No user with id:${ID} exists.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a user
server.delete('/api/users/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const users = await db
      .where('id', ID)
      .from('users')
      .first();
    if (users) {
      try {
        const user = await db
          .where('id', ID)
          .from('users')
          .del();
        if (user) {
          res.status(200).json({ message: `Deleted user id:${ID}` });
        } else {
          res.status(500).send(`impossible error deleting user id:${ID}`);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json({ error: `No user with id:${ID} exists.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/* 
  POSTS
*/

// add a post for a user
server.post('/api/users/:id/posts', postsConstraints, async (req, res) => {
  const TEXT = req.body.text;
  const ID = req.params.id;
  const newPost = { userId: ID, text: TEXT };

  try {
    const posts = await db.insert(newPost).into('posts');
    // returns an array, we want the first one
    res.status(201).json({ message: `Succesfully added post id:${posts[0]}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all posts
server.get('/api/posts', async (req, res) => {
  try {
    const posts = await db('posts');
    if (posts.length === 0) {
      res.status(200).json({ message: 'There are currently no posts' });
    } else {
      res.status(200).json(posts);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get post by id
server.get('/api/posts/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const posts = await db
      .where('id', ID)
      .from('posts')
      .first();
    if (posts) {
      res.status(200).json(posts);
    } else {
      res.status(404).json({ error: `No post with id:${ID} exists.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit a post
server.put('/api/posts/:id', postsConstraints, async (req, res) => {
  const ID = req.params.id;
  const TEXT = req.body.text;
  const modifiedpost = { text: TEXT };

  try {
    const posts = await db
      .where('id', ID)
      .from('posts')
      .first();
    if (posts) {
      try {
        const post = await db
          .where('id', ID)
          .from('posts')
          .update(modifiedpost);
        if (post) {
          res.status(200).json({ message: `Updated post id:${ID}` });
        } else {
          res.status(500).send(`impossible error updating post id:${ID}`);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json({ error: `No post with id:${ID} exists.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a post
server.delete('/api/posts/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const posts = await db
      .where('id', ID)
      .from('posts')
      .first();
    if (posts) {
      try {
        const post = await db
          .where('id', ID)
          .from('posts')
          .del();
        if (post) {
          res.status(200).json({ message: `Deleted post id:${ID}` });
        } else {
          res.status(500).send(`impossible error deleting post id:${ID}`);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json({ error: `No post with id:${ID} exists.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/* 
  TAGS
*/

// add a tag
server.post('/api/tags', tagsConstraints, async (req, res) => {
  const TAG = req.body.tag;
  const newTag = { tag: TAG };

  try {
    const tags = await db.insert(newTag).into('tags');
    res
      .status(201)
      // returns an array, we want the first one
      .json({ message: `Succesfully added tag id:${tags[0]}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all tags
server.get('/api/tags', async (req, res) => {
  try {
    const tags = await db('tags');
    if (tags.length === 0) {
      res.status(200).json({ message: 'There are currently no tags' });
    } else {
      res.status(200).json(tags);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a tag
server.get('/api/tags/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const tags = await db
      .where('id', ID)
      .from('tags')
      .first();
    if (tags) {
      res.status(200).json(tags);
    } else {
      res.status(404).json({ error: `No tag with id:${ID} exists.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// edit a tag
server.put('/api/tags/:id', tagsConstraints, async (req, res) => {
  const ID = req.params.id;
  const TAG = req.body.tag;
  const modifiedtag = { tag: TAG };

  try {
    const tags = await db
      .where('id', ID)
      .from('tags')
      .first();
    if (tags) {
      try {
        const tag = await db
          .where('id', ID)
          .from('tags')
          .update(modifiedtag);
        if (tag) {
          res.status(200).json({ message: `Updated tag id:${ID}` });
        } else {
          res.status(500).send(`impossible error updating tag id:${ID}`);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json({ error: `No tag with id:${ID} exists.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete a tag
server.delete('/api/tags/:id', async (req, res) => {
  const ID = req.params.id;

  try {
    const tags = await db
      .where('id', ID)
      .from('tags')
      .first();
    if (tags) {
      try {
        const tag = await db
          .where('id', ID)
          .from('tags')
          .del();
        if (tag) {
          res.status(200).json({ message: `Deleted tag id:${ID}` });
        } else {
          res.status(500).send(`impossible error deleting tag id:${ID}`);
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json({ error: `No tag with id:${ID} exists.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

/*
  Extra Credit
*/

// add a posttag relationship
server.post('/api/posttags', posttagsConstraints, async (req, res) => {
  const TAG = req.body.tagId;
  const POST = req.body.postId;
  const newTag = { postId: POST, tagId: TAG };

  try {
    const tags = await db.insert(newTag).into('posttags');
    res
      .status(201)
      // returns an array, we want the first one
      .json({ message: `Succesfully added posttag id:${tags[0]}` });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all post-tags
server.get('/api/posttags', async (req, res) => {
  try {
    const posttags = await db('posttags');
    if (posttags.length === 0) {
      res.status(200).json({ message: 'There are currently no posttags' });
    } else {
      res.status(200).json(posttags);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all tags for a specific post
server.get('/api/posts/:id/tags', async (req, res) => {
  const ID = req.params.id;

  // make sure we have a post with that ID

  try {
    const posts = await db
      .where('id', ID)
      .from('posts')
      .first();
    if (posts) {
      console.log('POSTS', posts);
      try {
        const tags = await db.where('postId', ID).from('posttags');
        if (tags.length > 0) {
          res.status(200).json(tags);
        } else {
          res.status(200).json({ message: `No tags for post id:${ID} exist.` });
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(404).json({ error: `No post with id:${ID} exists.` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// error handling
server.use(errors);

// not found - 404
server.use((req, res) => {
  res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`);
});

server.listen(
  PORT,
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`),
);
