const express = require('express');
const server = express();

/*
atencao: define o tipo de dado passado pelop post ao servidor node pra do tipo json, evita o erro a baixo:
        TypeError: Cannot destructure property 'name' of 'req.body' as it is undefined
*/
server.use(express.json());

// CRUD = Create, Read, Update e Delete
const cursos = ['Node JS', 'JavaScript', 'React Native'];

// middleware em formato padrao
server.use((req, res, next) => {
    console.log(`rul chamada: ${req.url}`);
    return next();
});

// middleware em formato de funcao para uso em uma determinada rota especifica
function middleware_curso(req, res, next) {
    if (!req.body.name) return res.status(400).json({ error: "O nome do curso é obrigatorio" });
    return next();
}

function middleware_eixo_curso(req, res, next) {
    const curso = cursos[req.params.eixo];
    req.curso = curso; // criei uma nova variavel no req para uso posterior a middleware

    if (!curso) return res.status(400).json({ error: "O curso não existe" });
    return next();
}

// route params GET -> listar tudo
server.get('/cursos', (req, res) => {
    return res.json(cursos); // retorna o array de dados  
});

// request body -> GET
server.get('/curso/:eixo', middleware_eixo_curso, (req, res) => {

    /*
    obs: com a criaçao da variavel "req.curso" na "middleware_eixo_curso"  eu simplifiquei este metodo com apenas o return
    
    const { eixo } = req.params; // pega o parametro do route param com o eixo
    return res.json(cursos[eixo]); // retorna o objeto do eixo do array de dados
    */

    return res.json(req.curso);
});

// request body -> POST
server.post('/curso', middleware_curso, (req, res) => {

    const { name } = req.body; // captura o parametro do body
    cursos.push(name); // adiciona um novo elemento no array js

    return res.json(cursos); // retorna o array de dados
});

// request body -> PUT
server.put('/curso/:eixo', middleware_curso, middleware_eixo_curso, (req, res) => {

    const { eixo } = req.params; // pega o parametro do route param com o eixo
    const { name } = req.body; // pega o parametro do request body json com o name

    cursos[eixo] = name; // atualiza o array js com o nome do elemento partindo do eixo

    return res.json(cursos); // retorna o array de dados
});


// request body -> DELETE
server.delete('/curso/:eixo', middleware_eixo_curso, (req, res) => {

    const { eixo } = req.params; // pega o parametro do route param com o eixo
    const { name } = req.body; // pega o parametro do request body json com o name

    cursos.splice(eixo, 1); // exclui o elemento do array js com o splice

    return res.json(cursos); // retorna o array de dados
});

// inicia o servidor node nesta porta
server.listen(3333);
