// modules importation
const express = require('express');

// modules importation
const router = express.Router();

// @route           get api/posts
// @description     posts route
// @access          public
router.get('/', (req, res) => res.send('Posts route'));

// exports each routes from the router
module.exports = router;
