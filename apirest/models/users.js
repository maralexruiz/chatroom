let mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

let usersSchema = new Schema({
    name: {type: String}
});


module.exports = mongoose.model('users', usersSchema);
