const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    latitude:{
        type:String,
        required:true
    },
    longitude:{
        type:String,
        required:true,
    }
}, {timeStamps: true});

// Index for geoLocation field

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
