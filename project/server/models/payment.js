const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Payment = sequelize.define('payments', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  method: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

module.exports = Payment;
