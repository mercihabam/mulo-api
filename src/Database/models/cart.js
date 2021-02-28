const Sequelize = require("sequelize");
const uuid = require("uuid");
const sequelize = require("../connection/connection");

module.exports = sequelize.define("Carts", {
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
    },
    userId:{
        type: Sequelize.UUID,
        allowNull: false
    },
    ordered: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
    },
});