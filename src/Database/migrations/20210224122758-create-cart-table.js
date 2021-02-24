'use strict';
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("Carts", {
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
      },
      userId:{
          type: Sequelize.UUID,
          allowNull: false
      },
      createdAt: {
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
    queryInterface.dropTable("Carts");
  }
};
