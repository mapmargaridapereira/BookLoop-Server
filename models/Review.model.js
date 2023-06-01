const {Schema, model} = require('mongoose');

const reviewSchema  = new Schema({
    content: String, 
    author: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    rating: Number

});


module.exports = model('Review', reviewSchema);