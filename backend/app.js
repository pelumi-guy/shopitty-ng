const express = require ("express");
const morgan = require('morgan');
const app = express();
const errorMiddleware = require('./middlewares/errors');
const cookieParser = require("cookie-parser");

app.use(express.json());

// dev mode console feedback
app.use(morgan('tiny'));

// Import product routes
const products = require('./routes/product');

// Import auth routes
const auth = require('./routes/auth');

// Import order routes
const order = require('./routes/order');

// Parse request cookies
app.use(cookieParser())

// Product routes (returns error if error occurs)
app.use('/api/v1', products);

// User routes
app.use('/api/v1', auth);

// Order routes
app.use('/api/v1', order);

// Middleware to handle errors
app.use(errorMiddleware);


module.exports = app;