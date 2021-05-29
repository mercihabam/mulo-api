'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Orders", "phoneNumber", {
      type: Sequelize.STRING
    });

    await queryInterface.changeColumn("Companys", "tel1", {
      type: Sequelize.STRING
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("Orders", "phoneNumber", {
      type: Sequelize.INTEGER
    });

    await queryInterface.changeColumn("Companys", "tel1", {
      type: Sequelize.INTEGER
    });
  }
};
