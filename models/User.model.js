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
    profileImg:  { type: String, default: "https://res.cloudinary.com/dfig7ot0w/image/upload/v1686044371/default-avatar-profile-icon-vector-social-media-user-image-700-205124837_mpcw5m.jpg"},
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
