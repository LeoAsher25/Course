const { Schema, default: mongoose, Types } = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const bcrypt = require("bcryptjs");

const User = new Schema({
  firstName: { type: String },
  lastName: { type: String },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

User.pre("save", async function (next) {
  try {
    console.log("password: ", this.password, this);
    // generate a salt
    const salt = await bcrypt.genSalt(10);
    console.log("Salt: ", salt);
    // generate a password hash (salt + hash)
    const passwordHashed = await bcrypt.hash(this.password, salt);
    // Re-assign password hashed
    this.password = passwordHashed;
    console.log("passwordHashed: ", passwordHashed);
    return false;
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model("User", User);
