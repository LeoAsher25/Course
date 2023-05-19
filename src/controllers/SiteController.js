const Book = require("../models/Book");
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
    const currentUser = req.session.currentUser;
    console.log("currentUser:: ", currentUser);
    Book.find({})
      .then((books) => {
        res.render("pages/home", {
          title: "Homepage",
          books,
          currentUser,
        });
      })
      .catch((error) => {
        next(error);
      });
  }
  upFile(req, res, next) {
    res.render("pages/upfile", {
      title: "Upload file",
    });
  }

  upFileSave(req, res, next) {
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
    if (req.method === "GET") {
      return res.render("pages/signIn.ejs", {
        title: "Sign In",
      });
    } else {
      const { email, password } = req.body;
      const foundUser = await User.findOne({ email, password });
      console.log("foundUser: ", foundUser);
      if (!foundUser) {
        return res.render("pages/signIn.ejs", {
          title: "Sign In",
          error: { message: "Email or password is incorrect." },
        });
      }

      req.session.currentUser = {
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        email: foundUser.email,
      };
      res.redirect("/");
    }
  }

  async signOut(req, res, next) {
    req.session.currentUser = null;
    return res.redirect("/");
  }

  async signUp(req, res, next) {
    const { firstName, lastName, email, password } = req.body;

    const foundUserByEmail = await User.findOne({ email });
    if (foundUserByEmail) {
      return res
        .status(403)
        .json({ error: { message: "Email is already in use." } });
    }

    const foundUserByUsername = await User.findOne({ email });
    if (foundUserByUsername) {
      return res
        .status(403)
        .json({ error: { message: "Username is already in use." } });
    }

    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });
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
