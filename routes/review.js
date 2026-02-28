const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");

const {
  validateReview,
  isLogedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/review.js");

//Post Review Route
router.post(
  "/",
  isLogedIn,
  validateReview,
  wrapAsync(reviewController.createReview),
);

//Delete review route
router.delete(
  "/:reviewId",
  isLogedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview),
);

module.exports = router;
