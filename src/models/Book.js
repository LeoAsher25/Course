const { Schema, default: mongoose, Types } = require("mongoose");
const slug = require("mongoose-slug-generator");
mongoose.plugin(slug);

const Book = new Schema(
  {
    name: { type: String, maxlength: 255, required: true },
    author: { type: String, default: "" },
    publishedAt: { type: Date, default: Date.now() },
    numberOfPages: { type: Number, default: 0 },
    type: { type: String, default: "" },
    imageUrl: { type: String, default: "" },
    description: { type: String, maxlength: 1000, required: true },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Book", Book);
