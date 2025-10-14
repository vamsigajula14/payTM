const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/paytm");

const UserSchema = new mongoose.Schema({
    username : String,
    firstname : String,
    lastname : String,
    password : String
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});
const User = mongoose.model("Users",UserSchema);
const Account = mongoose.model("Account",accountSchema);
module.exports = {
    User,
    Account
}