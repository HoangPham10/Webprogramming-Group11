const express = require('express');
const userController = require('../controllers/userController')
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/register', userController.Register);
router.post('/login', userController.Login)
router.get('/refresh_token', userController.refreshToken )
router.get('/',auth, userController.getUser )


router.post('/update', auth, userController.Update)
router.get('/logout', userController.logout)

router.post('/addToCart', auth, userController.addToCart)

router.post('/decreaseToCart', auth, userController.decreaseToCart)

router.post('/removeToCart', auth, userController.removeToCart)


module.exports = router;
