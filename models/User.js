const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique: [true,'username already exists'],
    },
    password:{
        type:String,
        required:true,
    }
})

const userModel = mongoose.model('users',userSchema)


module.exports = userModel