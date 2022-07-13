const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Category = sequelize.define('categories', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  brand: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

module.exports = Category;
