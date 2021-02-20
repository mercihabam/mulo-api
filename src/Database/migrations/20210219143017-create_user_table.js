'use strict';
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("Users", {
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
      },
      firstName: {
          type: Sequelize.STRING(),
          allowNull: false,
          required: true
      },
      lastName: {
          type: Sequelize.STRING(),
          allowNull: false,
          required: true
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
          required: true
      },
      avatar: {
          type: Sequelize.STRING(),
          allowNull: true,
          required: false
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        required: false,
        defaultValue: null
      },
      isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Users")
  }
};
