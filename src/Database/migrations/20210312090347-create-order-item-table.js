'use strict';
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("OrderItems", {
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
      },
      userId:{
          type: Sequelize.UUID,
          allowNull: false
      },
      orderId: {
          type: Sequelize.UUID,
          allowNull: true
      },
      itemId: {
          type: Sequelize.UUID,
          allowNull: false,
          required: true
      },
      ready: {
          type: Sequelize.BOOLEAN,
          defaultValue: false
      },
      companyId: {
          type: Sequelize.UUID,
          allowNull: false,
          required: true
      },
      createdAt: {
          type: Sequelize.DATE(),
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
    queryInterface.dropTable("OrderItems");
  }
};
