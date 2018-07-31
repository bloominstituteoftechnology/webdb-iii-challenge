const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());
const PORT = 3000;
/* prettier-ignore */
const { usersConstraints, postsConstraints, tagsConstraints } = require('./middleware');
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
    return res
      .status(201)
      .json({ message: `Succesfully added user id:${users[0]}` });
  } catch (err) {
    err => {
      return res.status(500).json(err);
    };
  }
});

// get all users
server.get('/api/users', async (req, res) => {
  try {
    const users = await db('users');
    if (users.length === 0) {
      return res.status(200).json({ message: 'There are currently no users' });
    } else {
      return res.status(200).json(users);
    }
  } catch (err) {
    err => {
      return res.status(500).json(err);
    };
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
      return res.status(200).json(users);
    } else {
      return res.status(404).json({ error: `No user with id:${ID} exists.` });
    }
  } catch (err) {
    err => {
      return res.status(500).json(err);
    };
  }
});

// gets all of a user's posts
server.get('/api/users/:id/posts', async (req, res) => {
  const ID = req.params.id;

  try {
    const posts = await db.where('userId', ID).from('posts');
    console.log('POSTS', posts);
    if (posts) {
      return res.status(200).json(posts);
    } else {
      return res.status(404).json({ error: `No post with id:${ID} exists.` });
    }
  } catch (err) {
    err => {
      return res.status(500).json(err);
    };
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
    return res
      .status(201)
      .json({ message: `Succesfully added post id:${posts[0]}` });
  } catch (err) {
    err => {
      return res.status(500).json(err);
    };
  }
});

// get all posts
server.get('/api/posts', async (req, res) => {
  try {
    const posts = await db('posts');
    if (posts.length === 0) {
      return res.status(200).json({ message: 'There are currently no posts' });
    } else {
      return res.status(200).json(posts);
    }
  } catch (err) {
    err => {
      return res.status(500).json(err);
    };
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
      return res.status(200).json(posts);
    } else {
      return res.status(404).json({ error: `No post with id:${ID} exists.` });
    }
  } catch (err) {
    err => {
      return res.status(500).json(err);
    };
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
    return (
      res
        .status(201)
        // returns an array, we want the first one
        .json({ message: `Succesfully added tag id:${tags[0]}` })
    );
  } catch (err) {
    err => {
      return res.status(500).json(err);
    };
  }
});

// get all tags
server.get('/api/tags', async (req, res) => {
  try {
    const tags = await db('tags');
    if (tags.length === 0) {
      return res.status(200).json({ message: 'There are currently no tags' });
    } else {
      return res.status(200).json(tags);
    }
  } catch (err) {
    err => {
      return res.status(500).json(err);
    };
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
    err => res.status(500).json(err);
  }
});

// // gets all of a user's posts
// server.get('/api/users/:id/posts', async (req, res) => {
//   const ID = req.params.id;

//   try {
//     const posts = await db.where('userId', ID).from('posts');
//     console.log('POSTS', posts);
//     if (posts) {
//       res.status(200).json(posts);
//     } else {
//       res.status(404).json({ error: `No post with id:${ID} exists.` });
//     }
//   } catch (err) {
//     err => res.status(500).json(err);
//   }
// });

// error handling
server.use(errors);

// not found - 404
server.use((req, res) => {
  return res.status(404).send(`<h1>404: resource "${req.url}" not found</h1>`);
});

server.listen(
  PORT,
  console.log(`\n=== Web API Listening on http://localhost:${PORT} ===\n`),
);
