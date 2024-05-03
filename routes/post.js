const express = require('express');
const router = express.Router();

const {savePost,editPost,deletePost}=require('./../controllers/postController')
const passport = require('./../utilities/passport')

router.post('/',[
    passport,
    savePost,
])

router.put('/:id',[
    passport,
    editPost,
])

router.delete('/:id',[
    passport,
    deletePost,
])

module.exports = router