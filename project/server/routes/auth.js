const express = require('express');
const authController = require('../controllers/auth')

const router = express.Router();

router.post('/', authController.authenticateUser);
// router.post('/login', userController.Login)

// router.post('/update', auth, userController.Update)
// router.get('/logout', userController.logout)

module.exports = router;
