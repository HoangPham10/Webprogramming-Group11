const express = require('express');
const reviewController = require('../controllers/reviewController')
const auth = require('../middleware/auth')

const router = express.Router();

router.post('/',auth, reviewController.postReview);
router.get('/:id', reviewController.getReviews);

module.exports = router;
