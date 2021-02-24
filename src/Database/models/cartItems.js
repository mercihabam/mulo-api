const Sequelize = require("sequelize");
const uuid = require("uuid");
const sequelize = require("../connection/connection");

module.exports = sequelize.define("CartItems", {
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
    },
    userId:{
        type: Sequelize.UUID,
        allowNull: false
    },
    menuId:{
        type: Sequelize.UUID,
        allowNull: false
    },
    quantity:{
        type: Sequelize.INTEGER(),
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
        allowNull: true,
        required: false,
        defaultValue: null
    }
});