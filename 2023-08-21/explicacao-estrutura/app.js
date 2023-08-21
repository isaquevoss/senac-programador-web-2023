const express = require('express');

const clientes = require('./clientes.js');

const app = express();

app.listen(3000, () => {
  console.log('app rodando na porta 3000');
});

app.get('/', helloWorld);

app.get('/buscar', buscarDados);

app.get('/clientes', clientes.getClientes);

function helloWorld(req, res) {
  res.send('Hello World! ' + 'from url ' + req.url);
}

function buscarDados(req, res, next) {
  res.send('Dados buscados');
  next();
}

function middleware(req, res, next){
    if (req.url === '/produtos')
        return res.status(401).send('Não autorizado');
    console.log(`url: ${req.url} - método: ${req.method} - data: ${new Date()} - ip: ${req.headers['x-forwarded-for'] || req.socket.remoteAddress }`);
    next();
}

app.get('/clientes', clientes.getClientes);

app.use(middleware)
app.get('/produtos', buscarDados)
app.get('/teste', buscarDados);
app.use(middleware)





