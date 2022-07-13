const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Review = sequelize.define('reviews', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  content: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

});

module.exports = Review;
