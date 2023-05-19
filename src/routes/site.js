const express = require("express");
const router = express.Router();

const siteController = require("../controllers/SiteController");

const passport = require("passport");

router.use("/signup", siteController.signUp);
router.use("/signin", siteController.signIn);
router.use("/sign-out", siteController.signOut);

router.get("/", siteController.index);

module.exports = router;
