const express = require('express');
const server = express();

server.get('/', (req, res) => {
    return res.send('<h1>hello word</h1>');
});

// inicia o servidor node nesta porta
server.listen(3333);
