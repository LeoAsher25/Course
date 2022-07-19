const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/CoursesController");

router.get("/create", coursesController.createCourse);
router.post("/store", coursesController.storeCourse);
router.get("/:slug", coursesController.showOne);
router.get("/", coursesController.showList);

module.exports = router;
