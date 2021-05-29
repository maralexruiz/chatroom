let mongoose = require('mongoose'),
    utils = require('../utils'),
    Schema = mongoose.Schema,
    User = require('./users');;

let charsSchema = new Schema({
    chatId: {type: Number, required: true},
    // userId: {type: String, required: true},
    message: {type: String, required: true},
    date: {type: Date, default: Date.now},
    fileType: {type: String, default: null, enum: [null, 'file', 'image']},
    fileUrl: {type: String},
    user: { type: Schema.ObjectId, ref: User } 
});

module.exports = mongoose.model('chats', charsSchema);
