const dotenv = require('dotenv');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// dotenv.config({ path: "backend/config/config.env" })
dotenv.config({ path: "config.env" })

const paystack = require("paystack-api")(process.env.PAYSTACK_API_KEY);
// console.log('api key: ', process.env.PAYSTACK_API_KEY);

// Process paystack payments => /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const transaction = await paystack.transaction.initialize({
        email: req.user.email,
        amount: req.body.amount // in kobo
      });

    res.status(200).json({
        success: true,
        redirect: transaction.data.authorization_url
    })
    // res.redirect(transaction.data.authorization_url);
});

// Verify paystack payments => /api/v1/payment/verify
exports.verifyPayment = catchAsyncErrors(async (req, res, next) => {

    const ref = req.params.ref;

    try {
        const payment = await paystack.transaction.verify({
            reference: ref
        });

        var verfication = {
            success: true,
            message: payment.message
        }

    } catch (error) {

         verfication = {
            success: false,
            message: "Verification failed"
        }
    }


    res.status(200).json(verfication)

    // res.status(200).json({
    //     success: true,
    //     verification: payment.data.status,
    //     message: payment.message
    // })
})