const { Schema, default: mongoose, Types } = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Course = new Schema(
  {
    name: { type: String, maxlength: 255, required: true },
    description: { type: String, maxlength: 1000, required: true },
    image: { type: String, maxlength: 255, required: true },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Course", Course);
