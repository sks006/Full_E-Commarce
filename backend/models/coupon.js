'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Coupon.init({
    code: DataTypes.STRING,
    discount_percentage: DataTypes.FLOAT,
    max_discount: DataTypes.FLOAT,
    expiry_date: DataTypes.DATE,
    minimum_order_value: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Coupon',
  });
  return Coupon;
};