const express = require('express');
const transactionController = require('../controllers/transactionController')
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/',auth, transactionController.createTransactions);
router.post('/history',auth, transactionController.getOrderHistory);
router.get('/:id', transactionController.getTransactions);


module.exports = router;
