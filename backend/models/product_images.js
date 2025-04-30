'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product_images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
       Product_images.belongsTo(models.Products, {
            foreignKey: "product_id",
            as: "product",
       });
    }
  }
  Product_images.init({
    product_id: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    alt_text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product_images',
  });
  return Product_images;
};