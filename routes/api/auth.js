// modules importation
const express = require('express');
const auth = require('../../middleware/auth');
const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');

// imports our user model
const User = require('../../models/User');

// holds the express router
const router = express.Router();

// @route           get api/auth
// @description     auth route
// @access          public
router.get('/', auth, async (req, res) => {
  try {
    // holds the user about to get authenticated, without the password
    const user = await User.findById(req.user.id).select('-password');

    // sends the user
    res.json(user);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// ***************************************************

// @route           post api/auth
// @description     authenticate user and get token
// @access          public
router.post(
  '/',
  [
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'password is required').exists()
  ],
  async (req, res) => {
    // holds the errors returned by express-validator
    const errors = validationResult(req);

    // if we have some errors, returns a 400 status with the custom error messages defined previously
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring the request's body
    const { email, password } = req.body;

    try {
      // checks if the user already exists
      let user = await User.findOne({ email });

      // if there is no user with the email entered, returns a 400 status with a custom error message
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      }

      // checks if the password entered matches the hashed password from the database
      const isMatch = await bcrypt.compare(password, user.password);

      // if there is no user with the password entered, returns a 400 status with a custom error message
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      }

      // holds the payload of the jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      // signs the jsonwebtoken
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          expiresIn: 360000
        },
        (err, token) => {
          // if we have an error, returns throw the error
          if (err) {
            throw err;
          }

          // sends back the jsonwebtoken
          res.json({ token });
        }
      );
    } catch (err) {
      // logs the message from the error object
      console.error(err.message);

      // returns a 500 status with a custom error message
      res.status(500).send('server error');
    }
  }
);

// ***************************************************

// exports each routes from the router
module.exports = router;
