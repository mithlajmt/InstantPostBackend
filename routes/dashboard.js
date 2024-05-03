const express = require('express');
const router = express.Router();

const {getPosts} = require('./../controllers/DashboardController')

router.get('/',[
    getPosts
])

module.exports = router