const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class Product_Tag extends Model {}

Product_Tag.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    product_id:{
      type: DataTypes.INTEGER,
      // references the product models id
      references: {
        model: 'product',
        key: 'id'
      }
    },
    tag_id:{
      type: DataTypes.INTEGER,
      // references the tag models id
      references: {
        model: 'tag',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = Product_Tag;
