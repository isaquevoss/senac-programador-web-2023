const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());

app.listen(3000, async () => {
  console.log('app iniciado');
  await sequelize.authenticate();
  await sequelize.sync(); //nunca utilizar em produção
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
  },
  {
    paranoid: true,
  }
);

async function criarCliente(req, res){
    const cliente = await Cliente.create(req.body)
    res.json(cliente)
}
  

async function listarClientes(req, res){
    const clientes = await Cliente.findAll()
    res.json(clientes)
}
async function deletarCliente(req, res){
    const cliente = await Cliente.findByPk(req.params.id)
    await cliente.destroy()
    res.json({mensagem: 'Cliente deletado com sucesso'})
}
app.delete('/clientes/:id', deletarCliente)
app.post('/clientes', criarCliente);
app.get('/clientes', listarClientes);