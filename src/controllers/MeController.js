const Book = require("../models/Book");

class MeController {
  async show(req, res, next) {
    try {
      const books = await Book.find({});
      res.render("me/main", {
        title: "Book List",
        books,
      });
    } catch (error) {
      next(error);
    }
  }

  async editBook(req, res, next) {
    const book = await Book.findOne({ slug: req.params.slug });
    return res.render("pages/bookForm", {
      title: "Edit a new Book",
      book,
    });
  }

  async editSaveBook(req, res, next) {
    await Book.findOneAndUpdate({ slug: req.params.slug }, req.body);
    res.redirect("/me/books");
  }

  async deleteBook(req, res, next) {
    try {
      await Book.deleteOne({ slug: req.params.slug });
      return res.redirect("/me/books");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MeController();
