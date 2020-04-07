// modules importation
const express = require('express');

// holds the express router
const router = express.Router();

// @route           get api/profile
// @description     profile route
// @access          public
router.get('/', (req, res) => res.send('Profile route'));

// exports each routes from the router
module.exports = router;
