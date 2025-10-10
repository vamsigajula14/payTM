const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/paytm");

const UserSchema = new mongoose.Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String
});

const userModel = mongoose.model("Users",UserSchema);

module.exports = {
    userModel
}