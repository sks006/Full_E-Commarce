/** @format */

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
     class SupportTicket extends Model {
          static associate(models) {
               // If you have a User model:
               SupportTicket.belongsTo(models.User, {
                    foreignKey: "user_id",
                    as: "user",
               });
          }
     }

     SupportTicket.init(
          {
               user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               subject: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               message: {
                    type: DataTypes.TEXT,
                    allowNull: false,
               },
               status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                         isIn: [["Open", "Resolved", "Closed"]],
                    },
               },
          },
          {
               sequelize,
               modelName: "SupportTicket",
               tableName: "SupportTickets",
               underscored: true,
               timestamps: true, // enables createdAt and updatedAt
          },
     );

     return SupportTicket;
};
