const express = require ('express');
const router = express.Router();

const User = require("../models/User.model");
const Book = require("../models/Book.model");
const Message = require("../models/Message.model");
const Review = require("../models/Review.model");

/* const fileUploader = require("../config/cloudinary.config");
 */
//Require middleware to check if user is logged in in order to access specific routes.
const { isAuthenticated } = require("../middleware/jwt.middleware");

//GET Route to render user profile
router.get('/profile/:id', isAuthenticated, async (req, res)=>{
    const { id } = req.params;

    try {
        const userProfile = await User.findById(id)
          .populate({
            path: "offeredBooks",
            populate: { path: "books", model: 'Book'},
          })
          .populate({
            path: "wishedBooks",
            populate: { path: "books", model: "Book" },
          })
          .populate({
            path: "messages",
            populate: { path: "messages", model: "Message" },
          })
          .populate({
            path: "reviews",
            populate: { path: "reviews", model: "Review" },
          });
    
        res.status(200).json(userProfile);
      } catch (error) {
        next(error);
      }
    });

//PUT Route to update user profile information
    router.put("/profile/:id", isAuthenticated, async (req, res, next) => {
        const { id } = req.params;
        const { name, about, profileImg } = req.body;
      
        try {
          const updateProfile = await User.findByIdAndUpdate(
            id,
            {
              name,
              about,
              profileImg,
            },
            { new: true }
          );
      
          res.status(200).json(updateProfile);
        } catch (error) {
          next(error);
        }
      });
      
//DELETE Route to remove user profile
router.delete("/profile/:id", isAuthenticated, async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.findByIdAndRemove(id);

    res
      .status(200)
      .json({ message: `The user with the id ${id} was deleted successfully` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
