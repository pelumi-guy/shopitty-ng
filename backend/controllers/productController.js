const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')

// Create new product => /api/v1/product/new
exports.newProducts = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

// Get all products => /api/v1/products?=keyword
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product, req.query)
                            .search()
                            .filter()
                            .pagination(resPerPage)

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    })
})

// Get single product => /api/v1/products/:id
exports.getSingleProduct = catchAsyncErrors(async(req, res, next) => {

    const products = await Product.findById(req.params.id)

    if (!products) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        products
    })
})

// Update product => /api/v1/admin/products/:id
exports.updateProduct = catchAsyncErrors(async(req, res, next) => {

    let products = await Product.findById(req.params.id);

    if (!products) {
        return next(new ErrorHandler('Product not found', 404));
    }

    products = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })
    res.status(200).json({
        success: true,
        products
    })
})

// Delete product => /api/v1/admin/products/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    id = req.params.id

    if (id == "all"){
        count = await Product.deleteMany()

        res.status(200).json({
            success: true,
            message: `${count.deletedCount} products in database deleted`
        })
            return
    }

    let products = await Product.findById(id);

    if (!products) {
        return next(new ErrorHandler('Product not found', 404));
    }

    products.deleteOne()

    res.status(200).json({
        success: true,
        message: "Product deleted"
    })
})