const express = require('express');
const bodyParser = require('body-parser');

const sqlite = require('sqlite3');
const knex = require('./db.js');

const server = express();

server.use(bodyParser.json());

// endpoints here
server.get('/users', function(req, res) {
  knex('Users')
      .then(function(users) {
          res.status(200).json(users);
      })
      .catch(function(error) {
          res.status(500).json({ error });
      });
});

server.post('/user', (req, res) => {
    const name = req.body.name;
    // console.log('zoo post name:', name);
    knex('Users').insert({name}, (err) => {
        res.status(401).json({error: 'bad name error:' + err});
    })
    .then((userIdArray) => {
        // console.log('inserted zoo:', zooIdArray);
        res.status(201).json(userIdArray[0]); 
    })
    .catch((err) => {
        res.status(500).json({error: 'insert error:' + err});
    }) 
})

server.get('/users/:id', function(req, res) {
  const { id } = req.params;
  knex('Users')
      .where('id', id)
      .then(function(user) {
          res.status(200).json(user);
      })
      .catch(function(error) {
          res.status(401).json({ error: "Not found" });
      });
});
server.delete('/users/:id', function(req, res) {
    const { id } = req.params;
    knex('Users')
        .where('id', id)
        .delete((err) => {
            res.status(501).json({ error: "Delete Error:" + err});
        })
        .then(() => {
            res.status(200).json(`user ${id} deleted`);
        })
        .catch(function(error) {
            res.status(401).json({ error: "Not found" });
        });
  });

server.get('/users/:id/posts', function(req, res) {
    const { id } = req.params;
    knex('Posts')
        .where('userId', id)
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch(function(error) {
            res.status(401).json({ error: "Not found" });
        });
  });
  server.get('/tags', function(req, res) {
    knex('Tagss')
        .then(function(tags) {
            res.status(200).json(tags);
        })
        .catch(function(error) {
            res.status(500).json({ error });
        });
  });
  server.post('/tags', (req, res) => {
    const tag = req.body.tag;
    const postIds = req.body.postIds;
    console.log('post postIds:', postIds);
    knex('Tagss').insert({tag}, (err) => {
        res.status(401).json({error: 'bad tag error:' + err});
    })
    .then((tagsIdArray) => {
        postIds.forEach((postId) => {
            knex('Posts')
              .where('id',postId)
              .then((Post) => {
                 // console.log(`adding PostTags postId:${postsIdArray[0]} tag[0].id: ${Tag[0].id}`)
                 knex('PostsTags').insert({postId: Post[0].id, tagId: tagsIdArray[0].id}, (postInsertError) => {
                    res.status(501).json({error: 'PostTags insert error:' + postInsertError});
                    return
                 })
                 .then((postsTagsArray) => {
                   //  console.log('postsTagsArray[0]:', postsTagsArray[0]);
                 })
              })
              .catch((postError) => {
                res.status(401).json({error: 'postId not found:' + err});
                return
              })
        });
        res.status(201).json(tagsIdArray[0]); 
    })
    .catch((err) => {
        res.status(500).json({error: 'insert error:' + err});
    }) 
})
server.get('/tags/:id', function(req, res) {
    const { id } = req.params;
    knex('Tags')
        .where('id', id)
        .then(function(tag) {
            res.status(200).json(tag);
        })
        .catch(function(error) {
            res.status(401).json({ error: "Not found" });
        });
  });
  server.delete('/tags/:id', function(req, res) {
      const { id } = req.params;
      knex('Tags')
          .where('id', id)
          .delete((err) => {
              res.status(501).json({ error: "Delete Error:" + err});
          })
          .then(() => {
              res.status(200).json(`tags ${id} deleted`);
          })
          .catch(function(error) {
              res.status(401).json({ error: "Not found" });
          });
    });
    server.get('/posts', function(req, res) {
        knex('Posts')
            .then(function(posts) {
                res.status(200).json(posts);
            })
            .catch(function(error) {
                res.status(500).json({ error });
            });
      });
      server.post('/posts', (req, res) => {
        const userId = req.body.userId;
        const text = req.body.text;
        const tags = req.body.tags;
        console.log('post tags:', tags);
        knex('Posts').insert({userId, text}, (err) => {
            res.status(401).json({error: 'bad userID or text error:' + err});
        })
        .then((postsIdArray) => {
            tags.forEach((tag) => {
                knex('Tags')
                  .where('tag',tag)
                  .then((Tag) => {
                      console.log(`adding PostTags postId:${postsIdArray[0]} tag[0].id: ${Tag[0].id}`)
                     knex('PostsTags').insert({postId: postsIdArray[0], tagId: Tag[0].id}, (tagInsertError) => {
                        res.status(501).json({error: 'PostTags insert error:' + tagInsertError});
                        return
                     })
                     .then((postsTagsArray) => {
                         console.log('postsTagsArray[0]:', postsTagsArray[0]);
                     })
                  })
                  .catch((tagError) => {
                    res.status(401).json({error: 'tag not found:' + err});
                    return
                  })
            });
            res.status(201).json(postsIdArray[0]); 
        })
        .catch((err) => {
            res.status(500).json({error: 'insert error:' + err});
        }) 
    })
    server.get('/posts/:id', function(req, res) {
        const { id } = req.params;
        knex('Posts')
            .where('id', id)
            .then(function(post) {
                res.status(200).json(post[0]);
            })
            .catch(function(error) {
                res.status(401).json({ error: "Not found" });
            });
      });
      server.delete('/posts/:id', function(req, res) {
          const { id } = req.params;
          knex('Posts')
              .where('id', id)
              .delete((err) => {
                  res.status(501).json({ error: "Delete Error:" + err});
              })
              .then(() => {
                  res.status(200).json(`post ${id} deleted`);
              })
              .catch(function(error) {
                  res.status(401).json({ error: "Not found" });
              });
        });
        server.get('/posts/:id/tags', function(req, res) {
            const { id } = req.params;
            knex('Posts')
                .where('id', id)
                .then(function(postArray) {
                    const post = postArray[0]
                    knex("PostsTags")
                    .where("postId",post.id)
                    .then((postsTagsArray) => {
                        const tagsTags = []
                        postsTagsArray.forEach((postTag) => {
                            knex(Tags)
                            .where('id', postTag.tagId )
                            .then((tags) => {
                                tagsTags.push(tags[0])
                            })
                        })
                        knex('Users')
                        .where('id', post.userId)
                        .then((users) => {
                            res.status(200).json({post: post.text, user: users[0].name, tags: tagsTags.join(',') });
                        })
                        .catch((userError) => {
                            res.status(401).json("can't get user:", userId);
                        })
                    })
                    .catch(function(error) {
                        res.status(401).json({ error: "PostTags Not found:" + error });
                    });                    
                })
                .catch(function(error) {
                    res.status(401).json({ error: "Not found" });
                });
          });        
const port = 3000;
server.listen(port, function() {
    console.log(`Server Listening on ${port}`);
});