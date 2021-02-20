const Sequelize = require("sequelize");

// const sequelize = new Sequelize(, process.env.DB_USER, '', { host: "localhost", dialect: "mysql", operatorAliases: false });
const sequelize = new Sequelize("dish", 'root', '', {host: 'localhost', dialect: 'mysql', operatorAliases: false});

module.exports = sequelize;
global.sequelize = sequelize;