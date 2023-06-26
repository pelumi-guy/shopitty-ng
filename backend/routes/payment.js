const express = require('express');
const router = express.Router();
const {
    isAuthenticatedUser,

} = require('../middlewares/auth');

const {
    processPayment,
    verifyPayment,

} = require('../controllers/paymentController');

router.route('/payment/process').post(isAuthenticatedUser, processPayment);

router.route('/payment/verify/:ref').get(isAuthenticatedUser, verifyPayment);

module.exports = router;
