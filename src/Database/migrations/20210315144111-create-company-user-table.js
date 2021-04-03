'use strict';
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("CompanyUsers", {
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
          type: Sequelize.STRING(),
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
    queryInterface.dropTable("CompanyUsers");
  }
};
