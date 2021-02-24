const Sequelize = require("sequelize");
const uuid = require("uuid");
const sequelize = require("../connection/connection");

module.exports = sequelize.define("Carts", {
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
    },
    cartId:{
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
    createdAt: {
        type: Sequelize.DATE(),
    },
    updateddAt: {
        type: Sequelize.DATE(),
        allowNull: true,
        required: false,
        defaultValue: null
    }
});