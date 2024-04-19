const express = require('express');
const server = express();

/*
atencao: define o tipo de dado passado pelop post ao servidor node pra do tipo json, evita o erro a baixo:
        TypeError: Cannot destructure property 'name' of 'req.body' as it is undefined
*/
server.use(express.json());

/*
    Query Params = ?nome=anderson
    Route Params = /curso/2
    Request Body = { nome: 'anderson', cpf: 06926903441 }

    variaveis:
    req = dados da nossa aplicacao, query param ou dados do body
    res = representa uma resposta pra o nosso frontend

    CRUD = Create, Read, Update e Delete
*/

// query params
server.get('/curso', (req, res) => {
    const nome = req.query.nome;
    return res.json({ curso: `Aprendendo: ${nome}` });
});

const cursos = ['Node JS', 'JavaScript', 'React Native'];

// route params GET
server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

// request body -> route POST
server.post('/curso', (req, res) => {
    const {name} = req.body;
    cursos.push(name);
    return res.json(cursos);
});

// route params
server.get('/curso/:num', (req, res) => {
    const {num} = req.params;
    return res.json(cursos[num]);
});

// route GETs
server.get('/log', () => {
    console.log('acessou a rota mensagem no backend!');
});
server.get('/hello_html', (req, res) => {
    return res.send('<h1>hello word</h1>');
});
server.get('/hello_json', (req, res) => {
    return res.json({ hello: 'word' });
});

// inicia o servidor node nesta porta
server.listen(3333);
