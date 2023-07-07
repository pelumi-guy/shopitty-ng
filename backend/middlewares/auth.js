const User = require('../models/user')
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken')

// check if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors( async (req, res, next) => {

    const { token } = req.cookies;

    console.log({token})

    if (!token) {
        return next(new ErrorHandler("Login first to access this resource.", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next()
})

// Handle user roles
exports.authorization = (...roles) => {
    return (req, res, next) => {
        const role = req.user.role

        if (!roles.includes(role)) {
            return next(new ErrorHandler(`Role (${role}) is not allowed to access this resource`, 404))
        }

        next()
    }
}