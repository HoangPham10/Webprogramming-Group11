const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Shipment = sequelize.define('shipments', {
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
  fee: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },

});

module.exports = Shipment;
