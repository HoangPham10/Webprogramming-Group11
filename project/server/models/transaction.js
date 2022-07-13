const Sequelize = require('sequelize');

const sequelize = require('../configs/database');

const Transaction = sequelize.define('transactions', {
    transaction_id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    shipment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    payment_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },


});

module.exports = Transaction;
