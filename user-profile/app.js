const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

/**
 * -------------- GENERAL SETUP ----------------
*/
// Create the Express application
const app = express();

// Configures the database and opens a global connection that can be used in any module
const { checkTables } = require('./config/database');

// Must first load the models
require('./models/User');
require('./models/UserQuestion');
require('./models/UserAnswer');
require('./models/associations');

checkTables();

// Set up Redis
const { UserSubscriber, QuestionSubscriber } = require('./config/redis');
require('./controllers/UserSubscriber');
require('./controllers/QuestionSubscriber');

UserSubscriber.subscribe('Users');
QuestionSubscriber.subscribe('Questions');

// Instead of using body-parser middleware, use the new Express implementation of the same thing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cross Origin Resource Sharing
app.use(cors());

// Logging for requests etc
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
