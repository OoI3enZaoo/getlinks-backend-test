const restify = require('restify');
const server = restify.createServer();
const PORT = 5000 || process.env.PORT
const morgan = require('morgan')

server.use(restify.plugins.bodyParser());
server.use(morgan('dev'))

require('./routes/members.js')(server)
require('./routes/auth.js')(server)

server.listen(PORT, () => console.log('server is running on port: ', PORT))
