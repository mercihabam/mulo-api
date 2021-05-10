'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Companys", "deliveryPrice", {
        type: Sequelize.INTEGER(),
        defaultValue: 0,
    });

    await queryInterface.addColumn("Companys", "deliveryCurrency", {
        type: Sequelize.STRING(),
        allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Companys", "deliveryPrice");
    await queryInterface.removeColumn("Companys", "deliveryCurrency");
  }
};
