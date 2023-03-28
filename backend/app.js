const express = require ('express');
const morgan = require('morgan');
const app = express();
const errorMiddleware = require('./middlewares/errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary');
const { logRequestBody } = require('./middlewares/myMiddlewares')

app.use(express.json());

// dev mode console feedback
if (JSON.stringify((process.env.NODE_ENV).trim()) === JSON.stringify("DEVELOPMENT")) {
    app.use(morgan('tiny'));
}

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Import product routes
const products = require('./routes/product');

// Import auth routes
const auth = require('./routes/auth');

// Import order routes
const order = require('./routes/order');

// Parse request cookies
app.use(cookieParser());

// Log request body before parsing with body-parser middleware
app.use(logRequestBody);

// Parse request body with body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Log request body after parsing with body-parser middleware
app.use(logRequestBody);

// --- Application server routes (returns error if error occurs) ---

// Product routes
app.use('/api/v1', products);

// User routes
app.use('/api/v1', auth);

// Order routes
app.use('/api/v1', order);

// Middleware to handle errors
app.use(errorMiddleware);


module.exports = app;