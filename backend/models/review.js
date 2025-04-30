'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
          Review.belongsTo(models.User, {
               foreignKey: "user_id",
               as: "user",
          });
          Review.belongsTo(models.Products, {
               foreignKey: "product_id",
               as: "product",
          });
    }
  }
  Review.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER,
    review_text: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};