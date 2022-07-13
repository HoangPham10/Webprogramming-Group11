const express = require('express');
const shipmentController = require('../controllers/shipmentController')
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/', shipmentController.getShipments)

module.exports = router;
