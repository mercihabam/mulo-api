const Sequelize = require("sequelize");
const uuid = require("uuid");
const sequelize = require("../connection/connection");

module.exports = sequelize.define("CompanyUsers", {
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
    },
    companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        required: true
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false,
        required: true
    },
    role: {
        type: Sequelize.INTEGER(),
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