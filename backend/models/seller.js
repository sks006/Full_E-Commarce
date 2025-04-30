'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Seller.belongsTo(models.User, {
             foreignKey: "user_id",
             as: "user",
        });
    }
  }
  Seller.init({
    user_id: DataTypes.INTEGER,
    shop_name: DataTypes.STRING,
    business_license: DataTypes.STRING,
    rating: DataTypes.STRING,
    verified: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Seller',
  });
  return Seller;
};