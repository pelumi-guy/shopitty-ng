const express = require('express')
const router = express.Router();

const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserProfile,
    updatePassword,
    updateProfile,
    allUsers,
    getUserDetails,
    updateUser,
    deleteUser

} = require('../controllers/authController');

const { isAuthenticatedUser, authorization } = require('../middlewares/auth');

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

router.route('/logout').get(logout);

router.route('/password/forgot').post(forgotPassword);

router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserProfile);

router.route('/me/update').put(isAuthenticatedUser, updateProfile);

router.route('/password/update').put(isAuthenticatedUser, updatePassword);

router.route('/admin/users').get(isAuthenticatedUser, authorization('admin'), allUsers);

router.route('/admin/user/:id')
                .get(isAuthenticatedUser, authorization('admin'), getUserDetails)
                .put(isAuthenticatedUser, authorization('admin'), updateUser)
                .delete(isAuthenticatedUser, authorization('admin'), deleteUser);



module.exports = router;
