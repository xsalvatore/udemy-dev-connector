const express = require('express');

const router = express.Router();

// @route           get api/profile
// @description     profile route
// @access          public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
