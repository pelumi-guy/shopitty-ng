const { json } = require('express');
const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (JSON.stringify((process.env.NODE_ENV).trim()) === JSON.stringify("DEVELOPMENT")) {
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMessage: err.message,
            stack: err.stack
        })
    }

    if (JSON.stringify((process.env.NODE_ENV).trim()) === JSON.stringify("PRODUCTION") ||
        process.env.NODE_ENV === "PRODUCTION") {

        console.log("handling production error now...");

        let error = {...err};

        error.message = err.message;

        // Handling Wrong Mongoose Object ID Error
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose Validation Error
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(value => value.message);
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose duplicate key errors
        if (err.code === 11000) {
            const message = `${Object.keys(err.keyValue)} already exists`;
            error = new ErrorHandler(message, 400);
        }

        // Handling wrong JWT error
        if (err.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid. Try again.';
            error = new ErrorHandler(message, 400);
        }

        // Handling Expired JWT Error
        if (err.name === 'TokenExpiredError') {
            const message = 'JSON Web Token is expired. Try again.';
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        })
    }
}