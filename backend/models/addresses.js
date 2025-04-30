/** @format */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
     class Addresses extends Model {
          /**
           * Helper method for defining associations.
           * This method is not a part of Sequelize lifecycle.
           * The `models/index` file will call this method automatically.
           */
          static associate(models) {
               // Define association here
               Addresses.belongsTo(models.User, {
                    foreignKey: "user_id",
                    as: "user",
               });
          }
     }
     Addresses.init(
          {
               user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               address_line: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               city: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               district: {
                    type: DataTypes.STRING,
                    allowNull: false,
               },
               postal_code: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
               },
               is_primary: {
                    type: DataTypes.BOOLEAN,
                    allowNull: false,
                    defaultValue: false,
               },
          },
          {
               sequelize,
               modelName: "Addresses",
               timestamps: true, // Automatically adds created_at and updated_at fields
          },
     );
     return Addresses;
};
