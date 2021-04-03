'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("Companys", "password", {
        type: Sequelize.STRING(),
        allowNull: false,
        required: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Companys", "password")
  }
};
