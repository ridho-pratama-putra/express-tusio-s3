const express = require('express');
const app = express();
const tus = require('tus-node-server');
const server = new tus.Server({ path: '/files' });
server.datastore = new tus.FileStore({ directory: './files' });
var morgan = require('morgan')
morgan.token('id', function getId (req) {
    return req.id
})

app.use(morgan('method::method url::url header::req[headers] resHeader::res[header] status::status content-length::res[content-length] - res-time::response-time ms'))
app.get('/files/*', (req, res, next) => {
    console.log('1')
});

app.post('/files/*', (req, res, next) => {
    console.log('2 : ', req.headers)
    next();
});

app.patch('/files/*', (req, res, next) => {
    console.log('3 :', req.headers)
    next();
});

app.put('/files/*', (req, res, next) => {
    console.log('4')
});

app.get('/', (req, res) => {
    console.log('5')
    res.send('Hello World!');
});

app.all("/files/*", server.handle.bind(server));

app.listen(8080, () => {
    console.log('Server listening on port 3000');
});