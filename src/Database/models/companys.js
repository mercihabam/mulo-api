const Sequelize = require("sequelize");
const uuid = require("uuid");
const sequelize = require("../connection/connection");

module.exports = sequelize.define("Companys", {
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
    rccm: {
        type: Sequelize.STRING(),
        allowNull: true,
        required: false
    },
    idNat: {
        type: Sequelize.STRING(),
        allowNull: true,
        required: false
    },
    numImpot: {
        type: Sequelize.STRING(),
        allowNull: true,
        required: false
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
        required: true,
    },
    adress: {
        type: Sequelize.TEXT(),
        allowNull: false,
        required: true
    },
    icon: {
        type: Sequelize.STRING(),
        allowNull: true,
        required: false
    },
    tel1: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        required: true
    },
    tel2: {
        type: Sequelize.INTEGER(),
        allowNull: true,
        required: false
    },
    tel3: {
        type: Sequelize.INTEGER(),
        allowNull: true,
        required: false
    },
    deliveryPrice: {
        type: Sequelize.FLOAT(),
        defaultValue: 0,
    },
    deliveryCurrency: {
        type: Sequelize.STRING(),
        allowNull: true
    }
});