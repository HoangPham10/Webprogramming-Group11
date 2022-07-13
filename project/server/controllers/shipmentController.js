const Shipment = require('../models/shipment');
const { Op } = require("sequelize");


exports.getShipments = async(req, res, next) => {
    try{
        const shipments = await Shipment.findAll()
        res.status(200).json({
            shipments: shipments
        })
    }catch(err) {
      console.log(err);
    };
};
