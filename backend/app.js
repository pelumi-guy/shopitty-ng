const express = require ('express');
const morgan = require('morgan');
const app = express();
const errorMiddleware = require('./middlewares/errors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const cloudinary = require('cloudinary');
const { logRequestBody } = require('./middlewares/myMiddlewares');
const fileUpload = require('express-fileupload');
const path = require('path');

// Parse request body with body-parser middleware
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(bodyParser.json({ limit: "50mb" }));

// dev mode console feedback
// if (JSON.stringify((process.env.NODE_ENV).trim()) === JSON.stringify("DEVELOPMENT")) {
//     app.use(morgan('tiny'));
// }
// app.use(morgan('tiny'));

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// Import product routes
const products = require('./routes/product');

// Import auth routes
const auth = require('./routes/auth');

// Import order routes
const order = require('./routes/order');

// Import payment routes
const payment = require('./routes/payment');

// Parse request cookies
app.use(cookieParser());

// // Log request body before parsing with body-parser middleware
// app.use(logRequestBody);


// // Log request body after parsing with body-parser middleware
// app.use(logRequestBody);

// Express fileUpload middleware
app.use(fileUpload());

// --- Application server routes (returns error if error occurs) ---

// app.get('*', (req, res) => {
//     res.send("Server is reachable");
// })

// Product routes
app.use('/api/v1', products);

// User routes
app.use('/api/v1', auth);

// Order routes
app.use('/api/v1', order);

// Payment routes
app.use('/api/v1', payment);

// Middleware to handle errors
app.use(errorMiddleware);


// Serve frontend static files

app.use(express.static('./build'));

app.get('*', (req, res) => {
    const cwd = process.cwd()
    res.sendFile(cwd + '/build/index.html');
})

// if (JSON.stringify((process.env.NODE_ENV).trim()) === JSON.stringify("PRODUCTION")) {
//     app.use(express.static(path.join(__dirname, '../frontend/build')));

//     app.get('*', (req, res) => {
//         res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
//     })
// }


module.exports = app;