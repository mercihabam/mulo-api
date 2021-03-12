'use strict';
const uuid = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.createTable("CartItems", {
      id:{
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: uuid.v4()
      },
      userId:{
          type: Sequelize.UUID,
          allowNull: false
      },
      menuId:{
          type: Sequelize.UUID,
          allowNull: false
      },
      quantity:{
          type: Sequelize.INTEGER(),
          allowNull: false
      },
      cartId: {
        type: Sequelize.UUID,
        allowNull: true,
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
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("CartItems");
  }
};
