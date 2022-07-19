const express = require("express");
const router = express.Router();

const { upload, uploadMultipleFiles } = require("../config/multer");

const siteController = require("../controllers/SiteController");

const passport = require("passport");
const passportConfig = require("../middleware/passport");

router.get("/upload-file", siteController.upFile);
router.post("/upload-file-save", upload.single("file-upload"), siteController.upFileSave);
router.post(
  "/upload-multiple-file-save",
  uploadMultipleFiles.array("file-upload", 3),
  siteController.upMultipleFileSave
);

router.post("/signup", siteController.signUp);
router.post("/signin", siteController.signIn);
router.get("/secret", passport.authenticate("jwt", { session: false }), siteController.secret);

router.get("/", siteController.index);

module.exports = router;
