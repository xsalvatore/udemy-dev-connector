const express = require('express');

const router = express.Router();

// @route           get api/auth
// @description     auth route
// @access          public
router.get('/', (req, res) => res.send('Auth route'));

module.exports = router;
