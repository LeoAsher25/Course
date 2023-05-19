const { Schema, default: mongoose, Types } = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const User = new Schema({
  firstName: { type: String },
  lastName: { type: String },
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

module.exports = mongoose.model("User", User);
