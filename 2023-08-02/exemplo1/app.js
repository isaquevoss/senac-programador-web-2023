const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('olá mundo s!');
});

const clientes = [
  { id: 1, nome: 'joao', sobrenome: 'silva', idade: 30 },
  { id: 2, nome: 'maria' },
  { id: 3, nome: 'isaque' },
  { id: 4, nome: 'isaque', sobrenome: 'silva' },
];

app.get('/clientes', (req, res) => {
  var clientesFiltrados = clientes;
  if (req.query.nome) {
    clientesFiltrados = clientes.filter(
        (cli) => cli.nome == req.query.nome
    );
  }
  res.json(clientesFiltrados);
});

app.get('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const cliente = clientes.find((cli) => cli.id == id);
  res.json(cliente);
});

app.listen(3000, () => {
  console.log('app rodando na porta 3000!');
});
