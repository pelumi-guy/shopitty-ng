// import product data and mongoose
const products = require('../data/products.json');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/product.js');

const connectDatabase = require('../config/database');

// setup environment config
dotenv.config({ path: "backend/config/config.env" })

// connect database
connectDatabase();

// seedproducts 
const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log("Products are deleted");

        await Product.insertMany(products);
        console.log("All products have been added");

        process.exit();
    } catch (error) {
        console.log(error.message)
        process.exit();
    }
}

seedProducts();