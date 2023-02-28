const express = require('express');
const app = express();
const {Server, FileStore} = require('tus-node-server');
const server = new Server({
    path: '/files',
    namingFunction: (req) => {
        const {'upload-metadata': uploadMetadata} = req.headers;
        const spliiterUploadMetadata = uploadMetadata.split(',');

        const fileName = spliiterUploadMetadata[0].split(' ')[1]
        const filetype = spliiterUploadMetadata[1].split(' ')[1]
        const readableFileName = Buffer.from(fileName, 'base64').toString('ascii');
        const readableFileType = Buffer.from(filetype, 'base64').toString('ascii');

        return readableFileName;
    },
});

server.datastore = new FileStore({directory: './files'})

var morgan = require('morgan')
app.use(morgan('method::method url::url status::status content-length::res[content-length] - res-time::response-time ms'))

app.get('/files/*', (req, res, next) => {
    console.log('1')
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

// app.all("/files/*", server.handle.bind(server));

app.listen(8080, () => {
    console.log('Server listening on port 3000');
});