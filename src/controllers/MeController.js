const Course = require("../models/Course");

class MeController {
  async show(req, res, next) {
    try {
      const courses = await Course.find({});
      res.render("me/main", {
        title: "Course List",
        courses,
      });
    } catch (error) {
      next(error);
    }
  }

  async editCourse(req, res, next) {
    const course = await Course.findOne({ slug: req.params.slug });
    return res.render("pages/createCourse", {
      title: "Edit a new Course",
      course,
    });
  }

  async editSaveCourse(req, res, next) {
    await Course.findOneAndUpdate({ slug: req.params.slug }, req.body);
    res.redirect("/me/courses");
  }

  async deleteCourse(req, res, next) {
    try {
      await Course.deleteOne({ slug: req.params.slug });
      return res.redirect("/me/courses");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeController();
