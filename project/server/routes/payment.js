const express = require('express');
const paymentController = require('../controllers/paymentController')
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/', paymentController.getPayments)

module.exports = router;
