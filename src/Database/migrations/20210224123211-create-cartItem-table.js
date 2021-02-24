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
      cartId:{
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
      createdAt: {
          type: Sequelize.DATE(),
      },
      updateddAt: {
          type: Sequelize.DATE(),
          allowNull: true,
          required: false,
          defaultValue: null
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.dropTable("CartItems");
  }
};
