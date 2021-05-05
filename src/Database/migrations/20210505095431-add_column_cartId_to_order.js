'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addColumn("Orders", "cartId", {
      type: Sequelize.UUID,
      allowNull: false
    });
    queryInterface.addColumn("Orders", "companyId", {
      type: Sequelize.UUID,
      allowNull: false
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.removeColumn("Orders", "cartId");
    queryInterface.removeColumn("Orders", "companyId");
  }
};
