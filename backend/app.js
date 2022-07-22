const express = require ("express");

const app = express();

//Import all routes
const products = require('./routes/product');

app.use('/api/v1', products)
 
module.exports = app;