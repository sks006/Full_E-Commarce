/** @format */

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
     class Payment extends Model {
          static associate(models) {
               Payment.belongsTo(models.User, {
                    foreignKey: "user_id",
                    as: "user",
               });
               Payment.belongsTo(models.Orders, {
                    foreignKey: "order_id",
                    as: "order",
               });
          }
     }

     Payment.init(
          {
               user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               order_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               payment_method: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                         isIn: [["bKash", "Nagad", "COD", "Card"]],
                    },
               },
               status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                         isIn: [["Paid", "Failed", "Pending"]],
                    },
               },
               transaction_id: {
                    type: DataTypes.STRING,
                    allowNull: true,
               },
               paid_at: {
                    type: DataTypes.DATE,
                    allowNull: true,
               },
          },
          {
               sequelize,
               modelName: "Payment",
               tableName: "Payments",
               underscored: true,
               timestamps: true, // createdAt and updatedAt
          },
     );

     return Payment;
};
