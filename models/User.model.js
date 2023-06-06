const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    about: String,
    profileImg:  { type: String, default: "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"},
    offeredBooks: [{type: Schema.Types.ObjectId, ref: "Book"}],
    wishedBooks: [{type: Schema.Types.ObjectId, ref: "Book"}],
    messages: [{type: Schema.Types.ObjectId, ref: "Message"}],
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}],

  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
