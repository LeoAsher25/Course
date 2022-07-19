const express = require("express");
const router = express.Router();
const coursesController = require("../../controllers/apiController/CoursesController");

router.post("/store", coursesController.storeCourse);
router.get("/:slug", coursesController.showOne);
router.post("/", coursesController.createCourse);
router.get("/", coursesController.showList);

module.exports = router;
