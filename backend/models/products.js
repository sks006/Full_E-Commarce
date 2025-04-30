/** @format */

"use strict";
const { Model } = require("sequelize");
const { Sequelize } = require(".");
module.exports = (sequelize, DataTypes) => {
     class Products extends Model {
     
          static associate(models) {
               // Define associations
               Products.belongsTo(models.User, {
                    foreignKey: "seller_id",
                    as: "seller",
               });
               Products.belongsTo(models.Categories, {
                    foreignKey: "category_id",
                    as: "category",
               });
          }
     }
     Products.init(
          {
               seller_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               category_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               name: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               description: {
                    type: DataTypes.TEXT,
                    allowNull: true,
               },
               price: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               stock: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               brand: {
                    type: DataTypes.STRING,
                    allowNull: true,
               },
               images: {
                    type: DataTypes.JSON,
                    allowNull: true,
               },
          },
          {
               sequelize,
               modelName: "Products",
               timestamps: true, // Automatically adds created_at and updated_at fields
          },
     );
     return Products;
};
