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
      cartId: {
        type: Sequelize.UUID,
        allowNull: true
      },
      itemId: {
          type: Sequelize.UUID,
          allowNull: true
      },
      adress: {
        type: Sequelize.STRING(),
        allowNull: false
      },
      adress2: {
          type: Sequelize.INTEGER(),
          allowNull: false
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
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Orders");
  }
};
