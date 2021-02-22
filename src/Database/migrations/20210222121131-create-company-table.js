'use strict';
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("Companys", {
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
      userId: {
          type: Sequelize.UUID,
          allowNull: false,
          required: true
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
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("Companys");
  }
};
