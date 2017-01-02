// NOTE: 16a connect to mongoose
var mongoose = require ('mongoose');

// NOTE: 16b createthe Schema to use
var Schema = mongoose.Schema;

// NOTE: 16c Create the schema for the user
var userSchema = new Schema ({
    username: String,
    password: String,
    email: String,
    type: String
})

// NOTE: 16d
var User = mongoose.model ('User', userSchema);
// NOTE: 16c do not forget to export the page
module.exports = User;
