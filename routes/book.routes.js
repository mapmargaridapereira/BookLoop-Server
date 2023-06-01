// Backend --> To import Packages, we use require.
// React --> To import Packages, we use import. 

const router = require('express').Router();

const mongoose = require('mongoose');

// Require Data Models
const Book = require("../models/Book.model");

// GET /offers ROUTE that Lists the Books Up for offer
//WORKING
router.get('/offers', async(req,res)=>{
    try{
        let allBooks = await Book.find();
        res.json(allBooks);
    }
    catch(error){
        res.json(error);
    }
});

// POST /offers ROUTE that Creates a new Book up for offer
//WORKING? Not rendering title etc?
router.post('/offers', async (req,res)=>{
    const {title, author, genre, description, publisher, published_date} = req.body;

    try{
        let response = await Book.create({title, author, genre, description, publisher, published_date});
        res.json(response);
    }
    catch(error){
        res.json(error);
    }


});

// GET /offers/:bookId to display specific info of a Book
//WORKING - again not rendering title etc just the object ID
router.get('/offers/:bookId', async (req,res)=>{
    const {bookId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(bookId)){
        // status of 2xx is successful.
        // error with 4xx is client-side.
        // error with 5xx is server-side 
        res.status(400).json({message: 'Specified id is not valid'});
        return;
    }

    try{
        let foundBook = await Book.findById(bookId)
/*         .populate('tasks'); */
        res.status(200).json(foundBook);
    }
    catch(error){
        res.json(error);
    }
});

// PUT /offers/:bookId to update info of a Book
//WORKING
router.put('/offers/:bookId', async (req, res)=>{
    const {bookId} = req.params;
    const {title, author, genre, description, publisher, published_date} = req.body;

    if(!mongoose.Types.ObjectId.isValid(bookId)){
       res.status(400).json({message: 'Specified Id is not valid'}); 
       return; 
    }

    try{
        let updatedBook = await Book.findByIdAndUpdate(bookId, 
            {title, author, genre, description, publisher, published_date}, {new: true});
        res.json(updatedBook);
    }
    catch(error){
        res.json(error);
    }
});

//WORKING
router.delete('/offers/:bookId', async(req,res)=>{
    const {bookId} = req.params;

    if(!mongoose.Types.ObjectId.isValid(bookId)){
        res.status(400).json({message: 'Specified Id is not valid'}); 
        return; 
    }

    try{
        await Book.findByIdAndRemove(bookId);
        res.json({message: `Book with ${bookId} is removed.`})
    }
    catch(error){
        res.json(error);
    }
});

module.exports = router; 

