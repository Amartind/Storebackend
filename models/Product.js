// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Catagory = require('./Category')

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      allowNull:false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name:{
      type: DataTypes.STRING,
      allowNull:false
    },
    price:{
      type: DataTypes.DECIMAL,
      allowNull:false,
      validate:{
        //TODO: validate value is decimal
        isDecimal: true
      }
    },
    stock:{
      type: DataTypes.INTEGER,
      allowNull:false,
      defaultValue: 10,
      validate:{
        // TODO: validate value is numeric
        isNumeric: true
      }
    },
    catagory_id:{
      type: DataTypes.INTEGER,
      // references catagory model id
      references: {
        model:Catagory,
        key:'id'
      },
      onDelete: 'CASCADE'
    }
    
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
