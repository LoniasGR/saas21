const express = require('express');
const morgan = require('morgan');

/**
 * -------------- GENERAL SETUP ----------------
*/
// Create the Express application
const app = express();

// Configures the database and opens a global connection that can be used in any module
require('./config/database');

// Must first load the models
require('./models/User');

// Set up Redis
require('./config/redis');

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('dev'));

/**
 * -------------- ROUTES ----------------
 */

// Imports all of the routes from ./routes/index.js
app.use(require('./routes'));

/**
 * -------------- SERVER ----------------
 */

// Server listens on http://localhost:3000
app.listen(3000);
