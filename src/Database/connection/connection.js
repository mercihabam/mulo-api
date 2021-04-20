const Sequelize = require("sequelize");

// const sequelize = new Sequelize(, process.env.DB_USER, '', { host: "localhost", dialect: "mysql", operatorAliases: false });
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {host: process.env.DB_HOST || "localhost", dialect: 'mysql', operatorAliases: false});

module.exports = sequelize;
global.sequelize = sequelize;