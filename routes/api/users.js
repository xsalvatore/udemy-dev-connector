// modules importation
const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// imports the mongoose user schema
const User = require('../../models/User');

// holds the express router
const router = express.Router();

// @route           post api/users
// @description     register user
// @access          public
router.post(
  '/',
  [
    check('name', 'name is required')
      .not()
      .isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check(
      'password',
      'please enter a password with six or more characters'
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    // holds the errors returned by express-validator
    const errors = validationResult(req);

    // if we have some errors, returns a 400 status with the custom error messages defined previously
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring the request's body
    const { name, email, password } = req.body;

    try {
      // checks if the user already exists
      let user = await User.findOne({ email });

      // if the user already exists, returns a 400 status with a custom error message
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'user already exists' }] });
      }

      // gets user's gravatar
      const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      // creates a new instance of the user (not saved in database yet)
      user = new User({ name, email, avatar, password });

      // generates the encryption pattern using bcryptjs
      const salt = await bcrypt.genSalt(10);

      // encrypts the password using bcryptjs
      user.password = await bcrypt.hash(password, salt);

      // saves the new user to the database
      await user.save();

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

// exports each routes from the router
module.exports = router;
