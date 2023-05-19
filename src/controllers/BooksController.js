const Book = require("../models/Book");

class BooksController {
  showList(req, res, next) {
    Book.find({}).then((books) =>
      res.render("pages/books", {
        title: "Book List",
        books,
      })
    );
  }

  async showOne(req, res, next) {
    console.log("slug", req.params.slug);
    const book = await Book.findOne({ slug: req.params.slug });
    return res.render("pages/bookDetail", {
      title: "Book Detail",
      book,
    });
  }

  async bookForm(req, res, next) {
    return res.render("pages/bookForm", {
      title: "Create a new Book",
    });
  }

  async storeBook(req, res, next) {
    try {
      await Book.create(req.body);
      res.redirect("/me/books");
    } catch (error) {
      console.log("Error when create book", error);
    }
  }
}

module.exports = new BooksController();
