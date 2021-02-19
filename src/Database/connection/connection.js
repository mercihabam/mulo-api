const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, { host: "localhost", dialect: "mysql", operatorAliases: false });

module.exports = sequelize;
global.sequelize = sequelize