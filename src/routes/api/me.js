const express = require("express");

const router = express.Router();

const meController = require("../controllers/MeController");

router.get("/courses", meController.show);
router.get("/edit/:slug", meController.editCourse);
router.post("/edit/save/:slug", meController.editSaveCourse);
router.get("/delete/:slug", meController.deleteCourse);

module.exports = router;
