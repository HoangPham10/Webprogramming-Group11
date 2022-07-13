const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Product = sequelize.define('products', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.NUMBER,
    default: 0,
  },
  category_id: {
    type: Sequelize.NUMBER,
    allowNull: false,
  },
  OS: {
    type: Sequelize.STRING,
    allowNull: false
  },
  chipset: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ram:{
    type: Sequelize.STRING,
    allowNull: false
  },
  display: {
    type: Sequelize.STRING,
    allowNull: false
  },
  resolution:{
    type: Sequelize.STRING,
    allowNull: false
  },
  camera:{
    type: Sequelize.STRING,
    allowNull: false,
  },
  memory: {
    type: Sequelize.STRING,
    allowNull: false
  },
  pin:{
    type: Sequelize.STRING,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.NUMBER,
    allowNull: false
  }
});

module.exports = Product;
