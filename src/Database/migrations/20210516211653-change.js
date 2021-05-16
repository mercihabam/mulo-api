'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Companys", "deliveryPrice", {
        type: Sequelize.FLOAT,
        defaultValue: 0
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Companys", "deliveryPrice", {
        type: Sequelize.INTEGER,
        defaultValue: 0
      })
    ])
  }
};
