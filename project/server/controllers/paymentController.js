const Payment = require('../models/payment');
const { Op } = require("sequelize");


exports.getPayments = async(req, res, next) => {
    try{
        const payments = await Payment.findAll()
        res.status(200).json({
            payments: payments
        })
    }catch(err) {
      console.log(err);
    };
};
