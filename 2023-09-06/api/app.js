require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jsonWebToken = require('jsonwebtoken');

const { Sequelize, DataTypes } = require('sequelize');

const app = express();
app.use(bodyParser.json());
app.use(cors());
//npm install pg pg-hstore
const sequelize = new Sequelize({
  dialect: 'postgres',
  database: 'api',
  host: 'localhost',
  username: 'root', // usuario do seu banco de dados
  password: 'admin', // senha do seu banco de dados
});

app.listen(3000, async () => {
  await sequelize.authenticate();
  await sequelize.sync({ alter: true });
});

const Usuario = sequelize.define('usuario', {
  nome: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  senha: {
    type: DataTypes.STRING,
  },
});

const Cliente = sequelize.define('cliente', {
  nome: {
    type: DataTypes.STRING,
  },
  sobrenome: {
    type: DataTypes.STRING,
  },
  idade: {
    type: DataTypes.INTEGER,
  },
  email: {
    type: DataTypes.STRING,
  },
  dataNascimento: {
    type: DataTypes.DATE,
  },
});

const Endereco = sequelize.define('endereco', {
  rua: {
    type: DataTypes.STRING,
  },
  numero: {
    type: DataTypes.INTEGER,
  },
  complemento: {
    type: DataTypes.STRING,
  },
  bairro: {
    type: DataTypes.STRING,
  },
  cidade: {
    type: DataTypes.STRING,
  },
  clienteId: {
    references: {
      model: Cliente
    }
  }
});

Cliente.hasMany(Endereco);




async function cadastrarUsuario(req, res) {
  const usuario = await Usuario.create({
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
  });
  res.json(usuario);
}

async function login(req, res) {
  try {
    const usuario = await Usuario.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    if (usuario.senha === req.body.senha) {
      const token = jsonWebToken.sign(
        {
          usuario: usuario,
        },
        process.env.JWT_SECRET
      );
      res.json({
        token: token,
      });
    }
  } catch (error) {
    console.log('error no login');
    console.log(error.message);
    res.status(401).send('Usuário ou senha inválidos');
  }
}

async function authMiddleware(req, res, next) {
  const token = req.headers.authorization;
  try {
    jsonWebToken.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
}

async function buscarClientes(req, res) {
  const clientes = await Cliente.findAll();
  res.json(clientes);
}

async function cadastrarCliente(req, res) {
  const cliente = await Cliente.create({
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    idade: req.body.idade,
    dataNascimento: req.body.dataNascimento, 
    Endereco: [
      {
        rua: req.body.Endereco.rua
      }
    ],

  });

  res.json(cliente);
}

async function editarCliente(req, res) {
  const cliente = await Cliente.findByPk(req.params.id);
  cliente.nome = req.body.nome;
  cliente.sobrenome = req.body.sobrenome;
  cliente.idade = req.body.idade;
  cliente.dataNascimento = req.body.dataNascimento;
  cliente.save();

  res.json(cliente);
}

async function deletarCliente(req, res) {
  const cliente = await Cliente.findByPk(req.params.id);
  cliente.destroy();
  res.json({ message: 'cliente excluído com sucesso' });
}

async function buscarCliente(req, res) {
  const cliente = await Cliente.findByPk(req.params.id,{
    include: Endereco
  });
  res.json(cliente);
}

app.post('/usuarios', cadastrarUsuario);
app.post('/login', login);
app.use(authMiddleware);
app.get('/clientes', buscarClientes);
app.post('/clientes', cadastrarCliente);
app.patch('/clientes/:id', editarCliente);
app.delete('/clientes/:id', deletarCliente);
app.get('/clientes/:id', buscarCliente);
