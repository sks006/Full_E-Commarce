/** @format */

"use strict";

module.exports = {
     up: async (queryInterface, Sequelize) => {
          await queryInterface.createTable("Users", {
               id: {
                    allowNull: false,
                    autoIncrement: true,
                    primaryKey: true,
                    type: Sequelize.INTEGER,
               },
               name: {
                    type: Sequelize.STRING,
               },
               email: {
                    type: Sequelize.STRING,
               },
               password: {
                    type: Sequelize.STRING,
                    allowNull: false,
               },
               gender: {
                    type: Sequelize.STRING,
               },
               refreshToken: {
                    type: Sequelize.STRING,
               },
               date_of_birth: {
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

     down: async (queryInterface, Sequelize) => {
          await queryInterface.dropTable("Users");
     },
};
