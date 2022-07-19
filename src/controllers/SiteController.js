const Course = require("../models/Course");
const User = require("../models/User");

const JWT = require("jsonwebtoken");

const encodedToken = (userID) => {
  return JWT.sign(
    {
      iss: "Leo Asher",
      sub: userID,
      iat: new Date().getTime(),
      exp: new Date().setDate(new Date().getDate() + 3),
    },
    process.env.JWT_SECRET
  );
};

class SiteController {
  index(req, res, next) {
    console.log("main home");
    Course.find({})
      .then((courses) => {
        // res.json(courses);
        res.render("pages/home", {
          title: "Homepage",
          courses,
        });
      })
      .catch((error) => {
        // res.status(400).json({ error });
        next(error);
      });
  }
  upFile(req, res, next) {
    res.render("pages/upfile", {
      title: "Upload file",
    });
  }

  upFileSave(req, res, next) {
    // req.file conttains information of uploaded file
    // req.body conains information of text fields, if there were any
    // upload(req, res, function (err) {
    // req.file contains information of uploaded file
    // req.body contains information of text fields, if there were any

    // Display uploaded image for user validation
    res.send(
      `You have uploaded this image: <hr/><img src="/uploads/${req.file.filename}" width="500"><hr /><a href="./">Upload another image</a>`
    );
    // });
  }

  upMultipleFileSave(req, res, next) {
    console.log("multiple: ", req.files);
    if (req.fileValidationError) {
      return res.send(req.fileValidationError);
    } else if (!req.files.length) {
      return res.send("Please select an image to upload");
    }

    let result = "You have uploaded these images: <hr />";

    for (let index = 0; index < req.files.length; index++) {
      result += `<img src="/uploads/${req.files[index].filename}" style="width: 400px; margin-right: 20px" />`;
    }
    result += '<hr/><a href="./">Upload more images</a>';
    res.send(result);
  }

  secret(req, res, next) {
    console.log("Call to secret function");
  }

  async signIn(req, res, next) {
    console.log("Call to signIn function", req.body);
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username, password });
    if (!foundUser) {
      return res.status(400).json({ error: { message: "Username or password is incorrect." } });
    }
    const token = encodedToken(foundUser._id);
    return res.status(200).json({
      token,
    });
  }

  async signUp(req, res, next) {
    const { firstName, lastName, email, password, username } = req.body;

    const foundUserByEmail = await User.findOne({ email });
    if (foundUserByEmail) {
      return res.status(403).json({ error: { message: "Email is already in use." } });
    }

    const foundUserByUsername = await User.findOne({ username });
    if (foundUserByUsername) {
      return res.status(403).json({ error: { message: "Username is already in use." } });
    }

    const newUser = new User({ firstName, lastName, email, password, username });
    newUser.save();

    const token = encodedToken(newUser._id);

    res.setHeader("Authorization", token);

    return res.status(200).json({
      message: "Create new user successfully!",
      user: newUser,
    });
  }
}

module.exports = new SiteController();
