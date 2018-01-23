const express = require('express');
const bodyParser = require('body-parser');

const server = express();

server.use(bodyParser.json());

// endpoints here
server.post('/users', (req, res) => {
    const user = req.body;
    knex.insert(user)
        .into('users')
        .then(result => {

    res.json(result);
          })
          .catch(err => {
              res.json({
                  errorMessage: err.message
              });
          });
        });

server.get('/users', (req, res) => {
    const user = req.body;
    knex.insert(user)
        .into('users')
        .then(result => {

    res.json(result);
        })
        .catch(err => {
            res.json({
                errorMessage: err.message
            });
        });
      });   
       
server.get('/users/:id/posts', (req, res) => {
    const user = req.body;
    knex.insert(user)
        .into('users:id/posts')
        .then(result => {

    res.json(result);
        })
        .catch(err => {
            res.json({
                errorMessage: err.message
            });
        });
      });   

server.get('/users/:id', (req, res) => {
        const user = req.body;
        knex.insert(user)
            .into('users:id')
            .then(result => {
    
        res.json(result);
            })
            .catch(err => {
                res.json({
                    errorMessage: err.message
                });
            });
          });    
          
server.put('/users/:id', (req, res) => {
    const user = req.body;
    knex.insert(user)
        .into('users:id')
        .then(result => {

    res.json(result);
        })
        .catch(err => {
            res.json({
                errorMessage: err.message
            });
        });
      });         
      
server.delete('/users/:id', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('users:id')
        .then(result => {

        res.json(result);
        })
        .catch(err => {
            res.json({
                errorMessage: err.message
            });
        });
      });  
       
server.post('/posts', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('posts')
        .then(result => {
    
        res.json(result);
        })
        .catch(err => {
            res.json({
                errorMessage: err.message
                });
            });
          });  

server.get('/posts', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('posts')
        .then(result => {
            
        res.json(result);
        })
        .catch(err => {
        res.json({
            errorMessage: err.message
            });
        });
        });  

server.get('/posts:id', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('posts:id')
        .then(result => {
            
        res.json(result);
        })
        .catch(err => {
        res.json({
            errorMessage: err.message
            });
        });
        });  

server.put('/posts:id', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('posts:id')
        .then(result => {
                    
        res.json(result);
        })
        .catch(err => {
        res.json({
            errorMessage: err.message
            });
         });
         });  

server.delete('/posts:id', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('posts:id')
        .then(result => {
                            
        res.json(result);
        })
        .catch(err => {
        res.json({
            errorMessage: err.message
            });
        });
        });  
        
server.post('/tags', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('tags')
        .then(result => {
            
        res.json(result);
        })
        .catch(err => {
        res.json({
            errorMessage: err.message
            });
        });
        });  
        
server.get('/tags', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('tags')
        .then(result => {
                    
        res.json(result);
        })
        .catch(err => {
        res.json({
            errorMessage: err.message
            });
        });
        });  
        
server.get('/tags:id', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('tags:id')
        .then(result => {
                    
        res.json(result);
        })
        .catch(err => {
        res.json({
            errorMessage: err.message
            });
                });
                });  

server.put('/tags:id', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('tags:id')
        .then(result => {
                                    
     res.json(result);
                        })
    .catch(err => {
    res.json({
    errorMessage: err.message
   });
 });
                         });  
                
server.delete('/tags/:id', (req, res) => {
    const user = req.body; 
    knex.insert(user)
        .into('tags:id')
        .then(result => {
                                            
        res.json(result);
        })
        .catch(err => {
        res.json({
        errorMessage: err.message
    });
});
});  
                        
