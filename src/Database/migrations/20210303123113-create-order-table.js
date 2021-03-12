'use strict';
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("Orders", {
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
      },
      userId:{
          type: Sequelize.UUID,
          allowNull: false
      },
      delivered:{
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
      },
      codeDelivery: {
          type: Sequelize.INTEGER(),
          allowNull: false,
          required: false
      },
      adress: {
        type: Sequelize.STRING(),
        allowNull: false
      },
      adress2: {
          type: Sequelize.STRING(),
          allowNull: true
      },
      phoneNumber: {
        type: Sequelize.INTEGER(),
        allowNull: false,
        required: false
      },
      createdAt: {
          type: Sequelize.DATE(),
      },
      deliveredAt: {
          type: Sequelize.DATE(),
          allowNull: true,
          required: false,
          defaultValue: null
      },
      deletedAt: {
          type: Sequelize.DATE(),
          allowNull: true,
          required: false,
          defaultValue: null
      },
      updatedAt: {
        type: Sequelize.DATE(),
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Orders");
  }
};
