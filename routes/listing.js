const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLogedIn, isOwner, validateListing } = require("../middleware.js");


const { storage } = require("../cloudConfig.js");


// ✅ Import your controller
const listingController = require("../controllers/listing.js");

// ✅ Configure multer for file uploads
const multer = require("multer");
const upload = multer({ storage }); // adjust storage as needed

// Routes
router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLogedIn,
   
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing),
  );

// New Route
router.get("/new", isLogedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing))
  .put(
    isLogedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing),
  )
  .delete(
    isLogedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.deleteListing),
  );

// Edit Route
router.get(
  "/:id/edit",
  isLogedIn,
  isOwner,
  validateListing,
  wrapAsync(listingController.editListing),
);

module.exports = router;
