const express = require('express');
const router = express.Router();

const {savePost,editPost}=require('./../controllers/postController')
const passport = require('./../utilities/passport')

router.post('/',[
    passport,
    savePost,
])

router.put('/',[
    passport,
    editPost,
])

module.exports = router