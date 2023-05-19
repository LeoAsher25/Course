const Book = require("../models/Book");
const { formatDate } = require("../utils/formatDate");

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
    const book = await Book.findOne({ slug: req.params.slug });

    return res.render("pages/bookForm", {
      title: "Book Detail",
      book,
      isEdit: false,
      formatDate,
    });
  }

  async editBook(req, res, next) {
    const book = await Book.findOne({ slug: req.params.slug });

    if (req.method === "GET") {
      return res.render("pages/bookForm", {
        title: "Edit Book",
        book,
        isEdit: true,
        formatDate,
      });
    } else if (req.method === "POST") {
      const { name, author, publishedAt, numberOfPages, type, description } =
        req.body;
      if (
        !name ||
        !author ||
        !publishedAt ||
        !numberOfPages ||
        !type ||
        !description
      ) {
        return res.redirect(`/${req.params.slug}/edit`);
      }

      if (!req.file) {
        return res.redirect(`/${req.params.slug}/edit`);
      }

      const updatedBook = await Book.findOneAndUpdate(
        {
          slug: req.params.slug,
        },
        {
          name,
          author,
          publishedAt,
          numberOfPages,
          type,
          description,
          imageUrl: `/uploads/${req.file?.filename}`,
        }
      );
      return res.redirect(`/${req.params.slug}`);
    }
  }

  async addBook(req, res, next) {
    if (req.method === "GET")
      return res.render("pages/bookForm", {
        title: "Create a new Book",
        isEdit: true,
      });
    else if (req.method === "POST") {
      const { name, author, publishedAt, numberOfPages, type, description } =
        req.body;

      if (
        !name ||
        !author ||
        !publishedAt ||
        !numberOfPages ||
        !type ||
        !description
      ) {
        return res.redirect("/add-book");
      }

      if (!req.file) {
        return res.redirect("/add-book");
      }

      const newBook = new Book({
        name,
        author,
        publishedAt,
        numberOfPages,
        type,
        description,
        imageUrl: `/uploads/${req.file.filename}`,
      });
      await newBook.save();
      return res.redirect("/");
    }
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
