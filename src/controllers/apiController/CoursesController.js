const Course = require("../../models/Course");

class CoursesController {
  showList(req, res, next) {
    Course.find({}).then((courses) =>
      //   res.render("pages/courses", {
      //     title: "Course List",
      //     courses,
      //   })
      // res.json(courses)
      res.status(200).json({
        data: courses,
      })
    );
  }

  async showOne(req, res, next) {
    const course = await Course.findOne({ slug: req.params.slug });
    // return res.render("pages/courseDetail", {
    //   title: "Course Detail",
    //   course,
    // });
    res.status(200).json({
      data: course,
    });
  }

  async createCourse(req, res, next) {
    // return res.render("pages/createCourse", {
    //   title: "Create a new Course",
    // });
    const response = await Course.create(req.body);
    // const response = req.body;
    console.log("create successfully: ", response);
    res.status(200).json({
      message: "Create course successfully!",
      data: response,
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
