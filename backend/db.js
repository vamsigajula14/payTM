const mongoose = require("mongoose");
const { string } = require("zod");
require('dotenv').config();
const url = process.env.mongoUrl;
try{

    mongoose.connect(url);

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        minLength : 3,
        maxLength : 30
    },
    password : {
        type : String,
        required : true,
        minLength : 6
    },
    firstname : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    },
    lastname : {
        type : String,
        required : true,
        trim : true,
        maxLength : 50
    }
})

const User = mongoose.model("User",userSchema);
console.log("Schema created");
module.export = {
    User
}    
}catch(err){
    console.log(err.message);
}
