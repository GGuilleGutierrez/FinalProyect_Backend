'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  products.init({
    name: DataTypes.STRING,
    descript: DataTypes.TEXT,
    img: DataTypes.TEXT,
    price: DataTypes.FLOAT,
    stock: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};