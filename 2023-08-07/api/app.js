const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

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
    clientesFiltrados = clientes.filter((cli) => cli.nome == req.query.nome);
  }
  res.json(clientesFiltrados);
});

app.get('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const cliente = clientes.find((cli) => cli.id == id);
  
  res.json(cliente);
});

app.post('/clientes', (req, res) => {
  const cliente = {};
  cliente.id = clientes.length + 1;
  cliente.nome = req.body.nome;
  cliente.sobrenome = req.body.sobrenome;
  cliente.idade = req.body.idade;
  clientes.push(cliente);
  res.json(cliente);
})

app.put('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const cliente = clientes.find((cli) => cli.id == id);
  cliente.nome = req.body.nome;
  cliente.sobrenome = req.body.sobrenome;
  cliente.idade = req.body.idade;
  res.json(cliente);
});

app.delete('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const indice = clientes.findIndex((cli) => cli.id == id);
  clientes.splice(indice, 1);
  res.json({ mensagem: 'cliente removido com sucesso' });
});

app.listen(3000, () => {
  console.log('app rodando na porta 3000!');
});
