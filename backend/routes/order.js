const express = require('express');
const router = express.Router();

const { newOrder,
        getSingleOrder,
        myOrders,
        allOrders,
        updateOrder,
        deleteOrder

} = require('../controllers/orderController');

const { isAuthenticatedUser, authorization } = require('../middlewares/auth');

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

router.route('/orders/me').get(isAuthenticatedUser, myOrders);

router.route('/admin/orders').get(isAuthenticatedUser, authorization('admin'), allOrders)

// Used patch request, might have to change to put later
router.route('/admin/order/:id')
            .patch(isAuthenticatedUser, authorization('admin'), updateOrder)
            .delete(isAuthenticatedUser, authorization('admin'), deleteOrder)

module.exports = router;