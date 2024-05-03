const express = require('express');
const router = express.Router();

const {getPosts} = require('./../controllers/DashboardController')
const passport = require('./../utilities/passport')

router.get('/',[
    passport,
    getPosts
])

module.exports = router