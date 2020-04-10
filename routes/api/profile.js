// modules importation
const express = require('express');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const request = require('request');
const config = require('config');

// imports the mongoose user and profile schema
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// holds the express router
const router = express.Router();

// @route           get api/profile/me
// @description     get current user profile
// @access          private
router.get('/me', auth, async (req, res) => {
  try {
    // holds the profile (name and avatar) of the current user
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    // if there is no profile attached to the user, returns a 400 status with a custom error message
    if (!profile) {
      return res.status(400).json({ msg: 'there is no profile for this user' });
    }

    // sends back the profile
    res.json(profile);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           post api/profile
// @description     create or update a user profile
// @access          private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'status is required')
        .not()
        .isEmpty(),
      check('skills', 'skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // holds the errors returned by express-validator
    const errors = validationResult(req);

    // if we have some errors, returns a 400 status with the error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring the request's body
    const {
      company,
      website,
      location,
      status,
      bio,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // builds and holds the profile object
    const profileFields = {};

    // holds the user connected to the profile
    profileFields.user = req.user.id;

    // sets the profile fields
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;

    // builds and formats the profile skills field
    if (skills) {
      profileFields.skills = skills.split(',').map(skill => skill.trim());
    }

    // holds the profile social field
    profileFields.social = {};

    // builds and formats the profile social field
    if (youtube) profileFields.social.youtube = youtube;
    if (facebook) profileFields.social.facebook = facebook;
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;

    try {
      // using upsert option (creates new doc if no match is found):
      let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true }
      );

      // sends back the profile
      res.json(profile);
    } catch (err) {
      // logs the message from the error object
      console.error(err.message);

      // returns a 500 status with a custom error message
      res.status(500).send('server error');
    }
  }
);

// @route           get api/profile
// @description     get all profiles
// @access          public
router.get('/', async (req, res) => {
  try {
    // holds all the profiles with only the name and avatar
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);

    // returns the profiles
    res.json(profiles);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           get api/profile/user/:user_id
// @description     get profile by user id
// @access          public
router.get('/user/:user_id', async (req, res) => {
  try {
    // holds the specific profile, with only the name and avatar, of the user id parameter specified in the url
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate('user', ['name', 'avatar']);

    // if there is no profile,  returns a 400 status with a custom error message
    if (!profile) {
      return res.status(400).json({ msg: 'profile not found' });
    }

    // returns the profile
    res.json(profile);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // if there is no profile associated with the url parameter, returns a 400 status with a custom error message
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'profile not found' });
    }

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           delete api/profile
// @description     delete profile, user and posts
// @access          public
router.delete('/', auth, async (req, res) => {
  try {
    // removes the profile
    await Profile.findOneAndRemove({ user: req.user.id });

    // removes the user
    await User.findOneAndRemove({ _id: req.user.id });

    // returns the profiles
    res.json({ msg: 'user deleted' });
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           put api/profile/experience
// @description     add profile experience
// @access          private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'title is required')
        .not()
        .isEmpty(),
      check('company', 'company is required')
        .not()
        .isEmpty(),
      check('from', 'from date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // holds the validation errors
    const errors = validationResult(req);

    // if we have some errors, returns a 400 status with the error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring the request's body
    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    // holds the new experience
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      // holds the profile of the user about to add a new experience
      const profile = await Profile.findOne({ user: req.user.id });

      // adds the experience at the beginning of the experience array
      profile.experience.unshift(newExp);

      // saves the profile with the new experience added
      await profile.save();

      // returns the updated profile
      res.json(profile);
    } catch (err) {
      // logs the message from the error object
      console.error(err.message);

      // returns a 500 status with a custom error message
      res.status(500).send('server error');
    }
  }
);

// @route           delete api/profile/experience/:exp_id
// @description     delete experience from profile
// @access          private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    // holds the profile of the user about to add a new experience
    const profile = await Profile.findOne({ user: req.user.id });

    // gets the index of the experience about to be deleted
    const removeIndex = profile.experience
      .map(item => item.id)
      .indexOf(req.params.exp_id);

    // removes the experience
    profile.experience.splice(removeIndex, 1);

    // saves the updated profile to the database
    await profile.save();

    // returns the profile
    res.json(profile);
  } catch (err) {}
});

// @route           put api/profile/education
// @description     add profile education
// @access          private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'school is required')
        .not()
        .isEmpty(),
      check('degree', 'degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'field of study is required')
        .not()
        .isEmpty(),
      check('from', 'from date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // holds the validation errors
    const errors = validationResult(req);

    // if we have some errors, returns a 400 status with the error messages
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // destructuring the request's body
    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    // holds the new education
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      // holds the profile of the user about to add a new education
      const profile = await Profile.findOne({ user: req.user.id });

      // adds the education at the beginning of the experience array
      profile.education.unshift(newEdu);

      // saves the profile with the new education added
      await profile.save();

      // returns the updated profile
      res.json(profile);
    } catch (err) {
      // logs the message from the error object
      console.error(err.message);

      // returns a 500 status with a custom error message
      res.status(500).send('server error');
    }
  }
);

// @route           delete api/profile/experience/:exp_id
// @description     delete experience from profile
// @access          private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    // holds the profile of the user about to add a new experience
    const profile = await Profile.findOne({ user: req.user.id });

    // gets the index of the experience about to be deleted
    const removeIndex = profile.education
      .map(item => item.id)
      .indexOf(req.params.edu_id);

    // removes the experience
    profile.education.splice(removeIndex, 1);

    // saves the updated profile to the database
    await profile.save();

    // returns the profile
    res.json(profile);
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// @route           get api/profile/github/:username
// @description     get user repos from github
// @access          public
router.get('/github/:username', async (req, res) => {
  try {
    // holds the options for the github api request
    const options = {
      uri: `http://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    // fetches the data from the github api
    request(options, (error, response, body) => {
      // if there is an error and logs the message from the error object
      if (error) {
        console.error(error);

        // if the status code of the response is not 200, returns a 404 status with a custom error message
        if (response.statusCode !== 200) {
          return res.status(404).json({ msg: 'no github profile found' });
        }
      }

      // returns the body with the github repos
      res.json(JSON.parse(body));
    });
  } catch (err) {
    // logs the message from the error object
    console.error(err.message);

    // returns a 500 status with a custom error message
    res.status(500).send('server error');
  }
});

// exports each routes from the router
module.exports = router;
