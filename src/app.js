const express = require('express');
const app = express();
const {Server, FileStore, Metadata} = require('tus-node-server');
const server = new Server({
    path: '/files',
    namingFunction: (req) => {
        // 'upload-metadata': 'filename YmVyYmVyYmVyLm00YQ==,filetype YXVkaW8veC1tNGE=',
        const {'upload-metadata': uploadMetadata} = req.headers;
        const { filename, filetype } = Metadata.parse(uploadMetadata);
        return filename;
    },
});

server.datastore = new FileStore({directory: './files'})

var morgan = require('morgan')
app.use(morgan('method::method url::url status::status content-length::res[content-length] - res-time::response-time ms'))
const cors = require('cors');
app.use(cors())

app.get('/files/*', (req, res, next) => {
    console.log('1')
    server.handle(req, res)
});

app.post('/files/*', (req, res, next) => {
    console.log('2 :')
    server.handle(req, res)
});

app.patch('/files/*', (req, res, next) => {
    console.log('3 :')
    server.handle(req, res)
});
app.put('/files/*', (req, res, next) => {
    console.log('4')
    server.handle(req, res)
});

app.get('/', (req, res) => {
    console.log('5')
    res.send('Hello World!');
});

// handle when frontend use abort(true) instead of abort()
app.delete('/files/*', (req, res, next) => {
    console.log('6 :')
    server.handle(req, res)
});

const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});