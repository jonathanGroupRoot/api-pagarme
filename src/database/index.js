const { Sequelize } = require('sequelize');
const configDB = require('../config/database');

const connection = new Sequelize(configDB);

const User = require('../model/User');
const MetodoPagamento = require('../model/MetodosPagamento');

User.init(connection);
MetodoPagamento.init(connection);

User.associate(connection.models);
MetodoPagamento.associate(connection.models);

try {
    connection.authenticate();
    console.log('Banco de dados conectado');
}catch(error) {
    console.log('Erro ao conectar no banco de dados');
}
module.exports = connection;
