/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
     class Orders extends Model {
          /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
          static associate(models) {
               // Define associations
               Orders.belongsTo(models.User, {
                    foreignKey: "user_id",
                    as: "user",
               });
               Orders.belongsTo(models.Addresses, {
                    foreignKey: "address_id",
                    as: "address",
               });
               Orders.belongsTo(models.Payment, {
                    foreignKey: "payment_id",
                    as: "payment",
               });
               Orders.belongsTo(models.Shipping, {
                    foreignKey: "shipping_id",
                    as: "shipping",
               });
          }
     }
     Orders.init(
          {
               user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               address_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               status: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                         isIn: [
                              ["Pending", "Shipped", "Delivered", "Cancelled"],
                         ],
                    },
               },
               payment_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               shipping_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
          },
          {
               sequelize,
               modelName: "Orders",
               timestamps: true, // This will automatically add created_at and updated_at fields
          },
     );
     return Orders;
};
