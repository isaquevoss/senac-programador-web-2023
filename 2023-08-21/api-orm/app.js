//npm init
//npm install express body-parser sequelize sqlite3
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/database.sqlite',
  sync: true,
});

app.listen(3000, () => {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
    sequelize.sync();
  });
});

const User = sequelize.define(
  'user',
  {
    // Model attributes are defined here
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {}
);

const Cliente = sequelize.define(
  'cliente',
  {
    // Model attributes are defined here
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sobrenome: {
      type: DataTypes.STRING,
    },
    idade: {
      type: DataTypes.INTEGER,
    },
  },
  {}
);
async function createUser(req, res) {
  const user = await User.create({
    email: req.body.email,
    password: req.body.password,
  });
  res.json(user);
}

app.post('/users', createUser);

async function updateUser(req, res) {
  const user = await User.findByPk(req.params.id);
  user.email = req.body.email;
  user.password = req.body.password;
  await user.save();
  res.json(user);
}

app.put('/users/:id', updateUser);

const Produto = sequelize.define('produtos', {
  nome: {
    type: DataTypes.STRING(100),
    field: 'name',
  },
  preco: {
    type: DataTypes.DECIMAL,
  },
  codigoDeBarras: {
    type: DataTypes.STRING(13),
  },
});
