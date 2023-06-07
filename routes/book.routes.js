// Backend --> To import Packages, we use require.
// React --> To import Packages, we use import.

const router = require("express").Router();

const mongoose = require("mongoose");

// Require Data Models
const Book = require("../models/Book.model");

const { isAuthenticated } = require("../middleware/jwt.middleware");

// GET /offers ROUTE that Lists the Books Up for offer
router.get("/offers", async (req, res) => {
  try {
    let allBooks = await Book.find();
    res.json(allBooks);
  } catch (error) {
    res.json(error);
  }
});

// POST /offers ROUTE that Creates a new Book up for offer
router.post("/offers/new/:userId", isAuthenticated, async (req, res) => {
  const {
    bookImg,
    title,
    author,
    genre,
    language,
    description,
    publisher,
  } = req.body;

  const { userId } = req.params;

  if (!isAuthenticated) {
    res.redirect("/login");
  }

  try {
    let response = await Book.create({
      bookImg,
      title,
      author,
      genre,
      language,
      description,
      publisher,
      uploader: userId,
    });

    res.json(response);
  } catch (error) {
    res.json(error);
  }
});

// GET /offers/:bookId to display specific info of a Book
router.get("/offers/:bookId", async (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    // status of 2xx is successful.
    // error with 4xx is client-side.
    // error with 5xx is server-side
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  try {
    let foundBook = await Book.findById(bookId).populate("uploader");
    res.status(200).json(foundBook);
  } catch (error) {
    res.json(error);
  }
});

// PUT /offers/:bookId to update info of a Book
router.put("/offers/:bookId", isAuthenticated, async (req, res) => {
  const { bookId } = req.params;
  const {
    bookImg,
    title,
    author,
    genre,
    language,
    description,
    publisher,
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  try {
    let updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { bookImg, title, author, genre, language, description, publisher },
      { new: true }
    );
    res.json(updatedBook);
  } catch (error) {
    res.json(error);
  }
});

router.delete("/offers/:bookId", isAuthenticated, async (req, res) => {
  const { bookId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    res.status(400).json({ message: "Specified Id is not valid" });
    return;
  }

  try {
    await Book.findByIdAndRemove(bookId);
    res.json({ message: `Book with ${bookId} is removed.` });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
