const dotenv = require("dotenv");
dotenv.config();
const Sequelize = require("sequelize");

// const sequelize = new Sequelize("dish", "root", '', { host: "localhost", dialect: "mysql", operatorAliases: false });
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {host: process.env.DB_HOST, port: process.env.DB_PORT || 3306, dialect: 'mysql', operatorAliases: false});

module.exports = sequelize;
global.sequelize = sequelize;