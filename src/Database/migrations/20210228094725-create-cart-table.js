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
      companyId: {
        type: Sequelize.UUID,
        allowNull: false,
        required: true
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
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Carts");
  }
};
