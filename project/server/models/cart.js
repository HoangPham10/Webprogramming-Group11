const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Cart = sequelize.define('carts', {
  username: {
    type: Sequelize.STRING,
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }

});

module.exports = Cart;
