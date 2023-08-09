const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("olá mundo s!");
});

const clientes = [
  { id: 1, nome: "joao", sobrenome: "silva", idade: 30 },
  { id: 2, nome: "maria" },
  { id: 3, nome: "isaque" },
  { id: 4, nome: "isaque", sobrenome: "silva" },
];

app.get("/clientes", (req, res) => {
  var clientesFiltrados = clientes;
  if (req.query.nome) {
    clientesFiltrados = clientesFiltrados.filter((cli) => cli.nome == req.query.nome);
  }
  if (req.query.sobrenome) {
    clientesFiltrados = clientesFiltrados.filter((cli) => cli.sobrenome == req.query.sobrenome);
  }
  if (req.query.idade) {
    clientesFiltrados = clientesFiltrados.filter((cli) => cli.idade == req.query.idade);
  }
  res.json(clientesFiltrados);
});

app.get("/clientes/:id", (req, res) => {
  const id = req.params.id;
  const cliente = clientes.find((cli) => cli.id == id);

  res.json(cliente);
});

app.post("/clientes", (req, res) => {
  const cliente = {};
  cliente.id = clientes.length + 1;
  cliente.nome = req.body.nome;
  cliente.sobrenome = req.body.sobrenome;
  cliente.idade = req.body.idade;
  clientes.push(cliente);
  res.json(cliente);
});

app.put("/clientes/:id", (req, res) => {
  const id = req.params.id;
  const cliente = clientes.find((cli) => cli.id == id);
  cliente.nome = req.body.nome;
  cliente.sobrenome = req.body.sobrenome;
  cliente.idade = req.body.idade;
  res.json(cliente);
});

app.delete("/clientes/:id", (req, res) => {
  const id = req.params.id;
  const indice = clientes.findIndex((cli) => cli.id == id);
  if (indice < 0) {
    res.status(404).json({ mensagem: "cliente não encontrado" });
  } else {
    clientes.splice(indice, 1);
    res.json({ mensagem: "cliente removido com sucesso" });
  }
});

app.listen(3000, () => {
  console.log("app rodando na porta 3000!");
});
