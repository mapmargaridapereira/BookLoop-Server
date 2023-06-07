const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
  bookImg:  { type: String, default: "https://static.vecteezy.com/system/resources/previews/002/219/582/original/illustration-of-book-icon-free-vector.jpg"},
  title: {
    type: String,
    required: [true, "Book title is required."],
    unique: true,
  },
  author: {
    type: String,
    required: [true, "Author name is required."],
  },
  genre: String,
  description: String,
  publisher: String,
  uploader: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// Export the Model
module.exports = model("Book", bookSchema);



