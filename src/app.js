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

app.all("/files/*", server.handle.bind(server));

const port = 8080;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});