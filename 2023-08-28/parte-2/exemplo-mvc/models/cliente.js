const sequelize = require('../config/sequelize')

export default sequelize.define('cliente',{
    nome: {
        type: DataTypes.STRING,
    }
})