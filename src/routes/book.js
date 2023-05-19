const express = require("express");
const router = express.Router();
const booksController = require("../controllers/BooksController");
const { upload } = require("../config/multer");
const BooksController = require("../controllers/BooksController");

router.use("/add-book", upload.single("bookImage"), booksController.addBook);
router.get("/:slug", booksController.showOne);
router.use("/:slug/edit", upload.single("bookImage"), booksController.editBook);
router.get("/", booksController.showList);

module.exports = router;
