const restify = require('restify')
const server = restify.createServer()
const PORT = 5000 || process.env.PORT
const morgan = require('morgan')
const compression = require('compression')

server.use(restify.plugins.bodyParser())
server.use(morgan('dev'))
server.use(compression())

require('./routes/members.js')(server)
require('./routes/auth.js')(server)

server.listen(PORT, () => console.log('server is running on port: ', PORT))
