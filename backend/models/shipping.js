/** @format */

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
     class Shipping extends Model {
          static associate(models) {
               // Associations
               Shipping.belongsTo(models.Orders, {
                    foreignKey: "order_id",
                    as: "order",
               });
          }
     }

     Shipping.init(
          {
               order_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               counter_name: {
                    type: DataTypes.STRING,
                    allowNull: true,
               },
               tracking_number: {
                    type: DataTypes.INTEGER,
                    allowNull: true,
               },
               shipping_status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                         isIn: [["Processing", "Shipped", "Delivered"]],
                    },
               },
               shipping_fee: {
                    type: DataTypes.FLOAT,
                    allowNull: true,
               },
               expected_delivery: {
                    type: DataTypes.STRING,
                    allowNull: true,
               },
          },
          {
               sequelize,
               modelName: "Shipping",
          },
     );

     return Shipping;
};
