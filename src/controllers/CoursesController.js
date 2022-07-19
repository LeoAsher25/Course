const Course = require("../models/Course");

class CoursesController {
  showList(req, res, next) {
    Course.find({}).then((courses) =>
      res.render("pages/courses", {
        title: "Course List",
        courses,
      })
    );
  }

  async showOne(req, res, next) {
    console.log("slug", req.params.slug);
    const course = await Course.findOne({ slug: req.params.slug });
    return res.render("pages/courseDetail", {
      title: "Course Detail",
      course,
    });
  }

  async createCourse(req, res, next) {
    return res.render("pages/createCourse", {
      title: "Create a new Course",
    });
  }

  async storeCourse(req, res, next) {
    try {
      await Course.create(req.body);
      res.redirect("/me/courses");
    } catch (error) {
      console.log("Error when create course", error);
    }
  }
}

module.exports = new CoursesController();
