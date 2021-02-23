const Sequelize = require("sequelize");
const uuid = require("uuid");
const sequelize = require("../connection/connection");

module.exports = sequelize.define("Menus", {
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
    },
    name: {
        type: Sequelize.STRING(),
        allowNull: false,
        required: true
    },
    type: {
        type: Sequelize.STRING(),
        allowNull: false,
        required: true
    },
    price: {
        type: Sequelize.INTEGER(),
        allowNull: true,
        required: false
    },
    currency: {
        type: Sequelize.STRING(),
        allowNull: true,
        required: false
    },
    ready:{
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    image: {
        type: Sequelize.STRING(),
        allowNull: true,
        required: false
    },
    ingredients: {
        type: Sequelize.TEXT(),
        allowNull: false,
        required: true
    },
    companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        required: true
    },
    createdAt: {
        type: Sequelize.DATE(),
    },
    updatedAt: {
        type: Sequelize.DATE(),
    },
    deletedAt: {
        type: Sequelize.DATE(),
        allowNull: true,
        required: false,
        defaultValue: null
    }
});