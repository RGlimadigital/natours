const express = require('express');

const {
  checkBodyReview,
  checkIdReview,
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('./../controllers/reviewController');
const router = express.Router();

router.param('id', checkIdReview);

router.route('/').get(getAllReviews).post(checkBodyReview, createReview);
router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
