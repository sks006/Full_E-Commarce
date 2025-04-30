'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AppliedCoupon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       AppliedCoupon.belongsTo(models.Coupon, {
            foreignKey: "coupon_id",
            as: "coupon",
       });
       AppliedCoupon.belongsTo(models.User, {
            foreignKey: "user_id",
            as: "user",
       });
       AppliedCoupon.belongsTo(models.Orders, {
            foreignKey: "order_id",
            as: "order",
       });
    }
  }
  AppliedCoupon.init({
    coupon_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    applied_at: DataTypes.DATE,
    support_tickets: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AppliedCoupon',
  });
  return AppliedCoupon;
};