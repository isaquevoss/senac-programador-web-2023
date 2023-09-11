const express = require('express');
const app = express();

app.listen(3000);

function buscarClientes(req, res) {
  try {
    const clientes = ['cliente1', 'cliente2']; //buscar clientes do banco de dados
    res.json(clientes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ mensagem: 'Erro ao buscar clientes' });
  }
}

function buscarCliente(req, res) {
  try {
    const clientes = ['cliente1', 'cliente2'];
    const cliente = clientes.find((cliente) => cliente == req.params.nome);
    if (!cliente) {
      throw new Error('[406]Cliente não encontrado');
    }

    res.json(cliente);
  } catch (error) {
    console.log(error.message);
    var errorCode = 999;

    if (error.message.startsWith('[')) {
      errorCode = error.message.substring(1, 4);
    }
    res.status(errorCode).json({ mensagem: error.message });
  }
}

app.get('/clientes', buscarClientes);
app.get('/clientes/:nome', buscarCliente);
