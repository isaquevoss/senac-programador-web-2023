const { Sequelize, DataTypes } = require('sequelize');

export default  new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
});