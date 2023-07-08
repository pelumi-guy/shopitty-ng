// import product data and mongoose
const products = require('../data/products.json');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/product.js');

const { connectDatabase } = require('../config/database.js');

// setup environment config
dotenv.config({ path: "../../config.env" })

console.log(process.env.NODE_ENV)

// connect database
connectDatabase();

// seedproducts
const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log("Products are deleted");

        await Product.insertMany(products, {ordered: false});
        console.log("All products have been added");

        process.exit();
    } catch (error) {
        console.log(error.message)
        process.exit();
    }
}

// seedProducts();

const queryFind = async () => {
    const data = await Product.find({ price: { '$lte': 10000, '$gte': 0 }, ratings: { '$gte': 0 } })
    // const data = await Product.find().where('price').lt(1000).exec()
    // // , ratings: { '$gte': 0 } })
    console.log({data});
}

queryFind();