const express = require("express");
const router = express.Router();
const booksController = require("../controllers/BooksController");

router.get("/add-book", booksController.bookForm);
router.get("/:slug", booksController.showOne);
router.get("/", booksController.showList);

module.exports = router;
