'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Shippings", {
         id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
         },
         order_id: {
              type: Sequelize.INTEGER,
         },
         counter_name: {
              type: Sequelize.STRING,
         },
         tracking_number: {
              type: Sequelize.INTEGER,
         },
         shipping_status: {
              type: Sequelize.STRING,
              allowNull: false,
         },
         shipping_fee: {
              type: Sequelize.FLOAT,
         },
         expected_delivery: {
              type: Sequelize.STRING,
         },
         createdAt: {
              allowNull: false,
              type: Sequelize.DATE,
         },
         updatedAt: {
              allowNull: false,
              type: Sequelize.DATE,
         },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Shippings');
  }
};