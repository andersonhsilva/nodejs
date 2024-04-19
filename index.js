const express = require('express');
const server = express();

/*
    Query Params = ?nome=anderson
    Route Params = /curso/2
    Request Body = { nome: 'anderson', cpf: 06926903441 }

    variaveis:
    req = dados da nossa aplicacao, query param ou dados do body
    res = representa uma resposta pra o nosso frontend
*/

// query params
server.get('/curso', (req, res) => {
    const nome = req.query.nome;
    return res.json({ curso: `Aprendendo: ${nome}` });
});

// route params
server.get('/curso/:num', (req, res) => {
    const cursos = ['Node JS', 'JavaScript', 'React Native'];
    const { num } = req.params;
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
