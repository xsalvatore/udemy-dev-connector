// modules importation
const express = require('express');
const connectDB = require('./config/db');

// initializes our express server
const app = express();

// connects to the database
connectDB();

// returns a message to signify the api is running
app.get('/', (req, res) => res.send('API running'));

// define routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

// holds the port we want to use with a default if no ports has been specified
const PORT = process.env.PORT || 5000;

// launches the app and specifies on which port to listen for calls
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
