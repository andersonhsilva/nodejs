const express = require('express');
const server = express();

/*
atencao: define o tipo de dado passado pelop post ao servidor node pra do tipo json, evita o erro a baixo:
        TypeError: Cannot destructure property 'name' of 'req.body' as it is undefined
*/
server.use(express.json());

// CRUD = Create, Read, Update e Delete
const cursos = ['Node JS', 'JavaScript', 'React Native'];

// route params GET -> listar tudo
server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

// request body -> POST
server.post('/curso', (req, res) => {
    const { name } = req.body;
    cursos.push(name); // adiciona um novo elemento no array js
    return res.json(cursos);
});


// inicia o servidor node nesta porta
server.listen(3333);
