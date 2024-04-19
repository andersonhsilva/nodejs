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

    return res.json(cursos); // retorna o array de dados
    
});

// request body -> POST
server.post('/curso', (req, res) => {

    const { name } = req.body; // captura o parametro do body
    cursos.push(name); // adiciona um novo elemento no array js

    return res.json(cursos); // retorna o array de dados
});

// request body -> PUT
server.put('/curso/:eixo', (req, res) => {

    const { eixo } = req.params; // pega o parametro do route param com o eixo
    const { name } = req.body; // pega o parametro do request body json com o name

    cursos[eixo] = name; // atualiza o array js com o nome do elemento partindo do eixo

    return res.json(cursos); // retorna o array de dados
});


// request body -> DELETE
server.delete('/curso/:eixo', (req, res) => {

    const { eixo } = req.params; // pega o parametro do route param com o eixo
    const { name } = req.body; // pega o parametro do request body json com o name

    cursos.splice(eixo, 1); // exclui o elemento do array js com o splice

    return res.json(cursos); // retorna o array de dados
});

// inicia o servidor node nesta porta
server.listen(3333);
