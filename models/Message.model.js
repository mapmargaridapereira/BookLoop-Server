const {Schema, model} = require("mongoose");

const messageSchema = new Schema({

    sender: [{type: Schema.Types.ObjectId, ref: "User"}],
    receiver: [{type: Schema.Types.ObjectId, ref: "User"}],
    subject: String,
    content: String

});

module.exports = model('Message', messageSchema)