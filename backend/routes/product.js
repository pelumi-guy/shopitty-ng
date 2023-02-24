const express = require('express');
const router = express.Router();
const {
    isAuthenticatedUser,
    authorization

} = require('../middlewares/auth')

const {
    getProducts,
    newProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct

} = require('../controllers/productController.js');

router.route('/products').get(getProducts);

router.route('/products/:id').get(getSingleProduct);

router.route('/admin/product/new').post(isAuthenticatedUser, authorization('admin'), newProducts);

router.route('/admin/product/:id')
                            .put(isAuthenticatedUser, authorization('admin'), updateProduct)
                            .delete(isAuthenticatedUser, authorization('admin'), deleteProduct);

module.exports = router;