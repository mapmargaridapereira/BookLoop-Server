const { Schema, model } = require("mongoose");

const bookSchema = new Schema({
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
  published_date: Number,
});

// Export the Model
module.exports = model("Book", bookSchema);



