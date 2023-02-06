const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection');

class ProductTag extends Model {}

ProductTag.init(
  {
    // define columns
    product_id:{
      type: DataTypes.INTERGER,
      // references the product models id
    },
    tag_id:{
      type: DataTypes.INTERGER,
      // references the tag models id
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  },{
    sequelize,
}
);

module.exports = ProductTag;
