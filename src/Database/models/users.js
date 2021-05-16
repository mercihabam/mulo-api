const Sequelize = require("sequelize");
const uuid = require("uuid");
const sequelize = require("../connection/connection");

module.exports = sequelize.define("Users", {
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
    },
    firstName: {
        type: Sequelize.STRING(),
        allowNull: false,
        required: true
    },
    lastName: {
        type: Sequelize.STRING(),
        allowNull: false,
        required: true
    },
    email: {
        type: Sequelize.STRING(),
        allowNull: false,
        required: true,
        unique: true
    },
    password: {
        type: Sequelize.STRING(),
        allowNull: false,
        required: true
    },
    avatar: {
        type: Sequelize.STRING(),
        allowNull: true,
        required: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
});