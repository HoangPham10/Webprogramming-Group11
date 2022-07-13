const express = require('express');
const productController = require('../controllers/productController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin');
const router = express.Router();


router.get('/featured_product', productController.getFeaturedProducts);

router.get('/latest_product', productController.getLatestProducts);

router.get('/', productController.getAllProducts);

router.post('/', productController.getProducts);

router.get('/:id', productController.getProduct);

router.delete('/:id', productController.deleteProduct);


module.exports = router;
