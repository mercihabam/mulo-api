'use strict';
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("Menus", {
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
      reeady:{
          type: Sequelize.BOOLEAN,
          allowNull: true,
          defaultValue: false
      },
      image: {
          type: Sequelize.STRING(),
          allowNull: true,
          required: false
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
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Menus");
  }
};
