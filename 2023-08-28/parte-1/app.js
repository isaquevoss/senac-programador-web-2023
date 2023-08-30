const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.listen(3000, async () => {
  console.log('app iniciado');
  await sequelize.authenticate();
  await sequelize.sync({ alter: true }); //nunca utilizar em produção
});

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});

const Cliente = sequelize.define(
  'cliente',
  {
    nome: {
      type: DataTypes.STRING,
    },
    sobrenome: {
      type: DataTypes.STRING,
    },
    idade: {
      type: DataTypes.INTEGER,
    },
    cpf: {
      type: DataTypes.STRING(11),
    },
    nomeMae: {
      type: DataTypes.STRING,
    },
    nomePai: {
      type: DataTypes.STRING,
    },
    telefone: {
      type: DataTypes.STRING(11),
    },
    escolaridade: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  }
);

async function criarCliente(req, res) {
  const cliente = await Cliente.create(req.body);
  res.json(cliente);
}

async function listarClientes(req, res) {
  const clientes = await Cliente.findAll();
  res.json(clientes);
}
async function deletarCliente(req, res) {
  const cliente = await Cliente.findByPk(req.params.id);
  await cliente.destroy();
  res.json({ mensagem: 'Cliente deletado com sucesso' });
}

async function atualizarCliente(req, res) {
  const cliente = await Cliente.findByPk(req.params.id);
  cliente.nome = req.body.nome || null;
  cliente.sobrenome = req.body.sobrenome || null;
  cliente.idade = req.body.idade || null;
  cliente.cpf = req.body.cpf || null;
  cliente.save();
  res.json(cliente);
}

async function atualizarClienteParcialmente(req, res) {
  await Cliente.update(req.body, {
    where: {
      id: req.params.id,
    },
  });

  const cliente = await Cliente.findByPk(req.params.id);
  res.json(cliente);
}

app.delete('/clientes/:id', deletarCliente);
app.post('/clientes', criarCliente);
app.get('/clientes', listarClientes);
app.put('/clientes/:id', atualizarCliente);
app.patch('/clientes/:id', atualizarClienteParcialmente)
