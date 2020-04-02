// modules importation
const mongoose = require('mongoose');
const config = require('config');

// holds the mongodb URI
const db = config.get('mongoURI');

// connects to the database
const connectDB = async () => {
  try {
    // waits until the connection has been established with the database
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // logs a message to the console
    console.log('MongoDB connected...');
  } catch (err) {
    // logs a message to the console
    console.log(err.message);

    // exits process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
