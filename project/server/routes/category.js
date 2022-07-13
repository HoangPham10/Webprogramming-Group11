const express = require('express');
const categoryController = require('../controllers/categoryController')
const auth = require('../middleware/auth')

const router = express.Router();

router.get('/', categoryController.getCategories);
// router.post('/login', userController.Login)

// router.post('/update', auth, userController.Update)
// router.get('/logout', userController.logout)

module.exports = router;
