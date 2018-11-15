
const server = require('express')()
 require('./middleware')(server)
 require('./routes')(server)


server.get('./', (req, res) => {
  res.json({message : "it's ok"});
})


server.listen(9000, () => console.log('\n=== Port is open ===\n'))

