const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const APIFeatures = require('../utils/apiFeatures')
const cloudinary = require('cloudinary');

// Create new product (Admin) => /api/v1/product/new
exports.newProducts = catchAsyncErrors(async (req, res, next) => {

    // console.log(req.files);

    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images;
    }

    let imageLinks  = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'shopit/products'
        });

        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    console.log({imageLinks})

    req.body.images = imageLinks;
    req.body.user = req.user.id;

    const product = await Product.create(req.body);


    res.status(200).json({
        success: true,
        product
    })
})

// Get all products => /api/v1/products?=keyword
exports.getProducts = catchAsyncErrors(async (req, res, next) => {

    // return next(new ErrorHandler('Alert with react alert', 400));

    const resPerPage = 4;
    const productCount = await Product.countDocuments();

    const apiFeatures = new APIFeatures(Product, req.query)
                            .search()
                            // .filter()

    let products = await apiFeatures.query;

    // console.log({products})
    let filteredProductsCount = products.length;

    apiFeatures.pagination(resPerPage)
    products = await apiFeatures.query.clone();



    res.status(200).json({
        success: true,
        // count: products.length,
        resPerPage,
        productCount,
        products,
        filteredProductsCount
    })
})

// Get single product => /api/v1/products/:id
exports.getSingleProduct = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.findById(req.params.id)

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update product => /api/v1/admin/products/:id
exports.updateProduct = catchAsyncErrors(async(req, res, next) => {

    let products = await Product.findById(req.params.id);

    if (!products) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Upload images
    let images = [];
    if (typeof req.body.images === 'string') {
        images.push(req.body.images)
    } else {
        images = req.body.images;
    }

    let imageLinks  = [];

    for (let i = 0; i < images.length; i++) {
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder: 'shopit/products'
        });

        imageLinks.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imageLinks;

    products = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        products
    });
})

// Delete product => /api/v1/admin/products/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id

    if (id == "all"){
        count = await Product.deleteMany()

        res.status(200).json({
            success: true,
            message: `${count.deletedCount} products in database deleted`
        })
            return
    }

    let product = await Product.findById(id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    // Delete product images from cloudinary
    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id, { invalidate: true });
    }

    await product.deleteOne()

    res.status(200).json({
        success: true,
        message: "Product deleted"
    })
})

/* Product Reviews */

// Create new review => /api/v1/review
exports.createProductReview = catchAsyncErrors( async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);

    // product.reviews.forEach((review) => {
    //     review.user = req.user._id;
    // })

    const isReviewed = product.reviews.find(
        r => r.user.toString() === req.user._id.toString()
    )

    if(isReviewed) {
        product.reviews.forEach(review => {
            if(review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    // Need to understand this calculation what does the accumulator (acc) do?
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    })
})


// Get product reviews => /api/v1/reviews
exports.getProductReviews = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })

})

// Delete review => /api/v1/review/:id
exports.deleteReview = catchAsyncErrors( async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    // console.log({  product })
    const reviews = product.reviews.filter(review => review._id.toString() !== req.params.id.toString());



    const numOfReviews = reviews.length;

    let ratings = 0
    if(numOfReviews) {
        ratings = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    }


    console.log({ratings});

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numOfReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
    })
})

// Get all products (Admin) => /api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.find()

    res.status(200).json({
        success: true,
        product
    })
})

// // Create new product (Admin) => /api/v1/admin/product/new
// exports.newProduct = catchAsyncErrors(async(req, res, next) => {

//     let images = [];
//     if (typeof req.body.images === 'string') {
//         images.push(req.body.images)
//     } else {
//         images = req.body.images;
//     }

//     let imageLinks  = [];

//     for (let i = 0; i < images.length; i++) {
//         const result = await cloudinary.v2.uploader.upload(images[i], {
//             folder: 'products'
//         });

//         imagesLinks.push({
//             public_id: result.public_id,
//             url: result.secure_url,
//         })
//     }

//     req.body.images = imageLinks;
//     req.body.user = req.user.id;


//     const product = await Product.create(req.body);


//     res.status(200).json({
//         success: true,
//         product
//     })
// })