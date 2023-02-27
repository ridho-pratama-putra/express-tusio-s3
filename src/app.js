const express = require('express');
const app = express();
const tus = require('tus-node-server');
const server = new tus.Server({ path: '/files' }, (a,b,c) => {
    console.log('a :',a)
    console.log('b :',b)
    console.log('c :',c)
});
server.datastore = new tus.FileStore({ directory: './files' });

app.all('/files/*', server.handle.bind(server));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(8080, () => {
    console.log('Server listening on port 3000');
});