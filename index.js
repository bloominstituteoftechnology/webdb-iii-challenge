const server = require('./server/server.js')

const port = 7000

server.listen(port, () => console.log(`\n--Server Running on port ${port}--`))
