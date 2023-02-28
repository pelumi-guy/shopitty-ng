const Order = require('../models/order');
const Product = require('../models/product');

const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Create a new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors( async (req, res, next) => {
    const {
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo
    } = req.body;

    const order = await Order.create({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    });
})

// Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors( async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler(`No order found with this ID: ${req.params.id}`, 404))
    }

    res.status(200).json({
        success: true,
        order
    })
})

// Get all orders for logged in user => /api/v1/orders/me
exports.myOrders = catchAsyncErrors( async(req, res, next) => {
    const orders = await Order.find({ user: req.user.id });
    const orderCount = await Order.find({ user: req.user.id }).countDocuments();

    res.status(200).json({
        success: true,
        count: orderCount,
        orders
    })
})

// Get all orders (ADMIN) => /api/v1/admin/orders
exports.allOrders = catchAsyncErrors( async (req, res, next) => {
        const orders = await Order.find();

        let totalAmount = 0;

        orders.forEach(order => {
            totalAmount += order.totalPrice;
        })

        res.status(200).json({
            success: true,
            'Total price of orders': totalAmount,
            orders

        })
    }
)

// Update / Process a single order (ADMIN) => /api/v1/admin/order/:id
exports.updateOrder = catchAsyncErrors( async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (order.orderStatus === 'Delivered') {
        return next(new ErrorHandler('You have already delivered this order', 400));
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now()

    await order.save();

    res.status(200).json({
        success: true
    })

})

const updateStock = async (id, quantity) => {
    const product = await Product.findById(id);

    if (!product) {
        console.log(`There is no product with id: ${id} in the database`)
        return
    }

    product.stock -= quantity;

    product.save({ validateBeforeSave: false })
}

// Delete order => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors( async(req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
        return next(new ErrorHandler(`No order found with this ID: ${req.params.id}`, 404))
    }

    order.remove();

    res.status(200).json({
        success: true,
    })
})