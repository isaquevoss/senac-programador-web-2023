const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// const somenteNumeros = require('./funcoes/somente_numeros');

// somenteNumeros('1aw1231df+)asdasf');

const minhasFuncoes = require('./funcoes/minhas_funcoes_preferidas');

minhasFuncoes.somenteNumeros('1aw1231df+)asdasf');

const {
  somenteNumeros,
  formataCpf,
} = require('./funcoes/minhas_funcoes_preferidas');

console.log(somenteNumeros('1aw1231df+)asdasf'));

const clientesController = require('./clientes_controller');

clientesController.get();
