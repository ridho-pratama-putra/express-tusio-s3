const express = require('express');
const app = express();
const tus = require('tus-node-server');
const server = new tus.Server({ path: '/files' });
server.datastore = new tus.FileStore({ directory: './files' });
var morgan = require('morgan')
morgan.token('id', function getId (req) {
    return req.id
})

app.use(morgan('method::method url::url status::status content-length::res[content-length] - res-time::response-time ms'))

app.all('/files/*', server.handle.bind(server));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {
    console.log('Server listening on port 3000');
});