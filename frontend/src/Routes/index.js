import Home from "../components/Home";
import ProductDetails from "../components/product/ProductDetails";
import Login from "../components/user/Login";
// import LoginRedirect from "../components/user/LoginRedirect";
import Register from "../components/user/Register";
import Profile from "../components/user/Profile";
import UpdateProfile from "../components/user/UpdateProfile";
import UpdatePassword from "../components/user/UpdatePassword";
import ForgotPassword from "../components/user/ForgotPassword";
import NewPassword from "../components/user/NewPassword";
import Cart from "../components/cart/Cart";
import Shipping from "../components/cart/Shipping";
import ConfirmOrder from "../components/cart/ConfirmOrder";
import Payment from "../components/cart/Payment";
import OrderSuccess from "../components/cart/OrderSuccess";
import ListOrders from "../components/order/ListOrders";
import OrderDetails from "../components/order/OrderDetails";
import Dashboard from "../components/admin/Dashboard";
import ProductsList from "../components/admin/ProductsList";
import NewProduct from "../components/admin/NewProduct";
import UpdateProduct from "../components/admin/UpdateProduct";
import OrdersList from "../components/admin/OrdersList";
import ProcessOrder from "../components/admin/ProcessOrder";
import UsersList from "../components/admin/UsersList";
import UpdateUser from "../components/admin/UpdateUser";
import ProductReviews from "../components/admin/ProductReviews";
import EasterEgg from "../components/admin/EasterEgg";

const homePage = {
  path: "/",
  name: "Home",
  component: Home,
};

const productDetailsPage = {
  path: "/product/:id",
  name: "Product Details",
  component: ProductDetails,
};

const searchPage = {
  path: "/search/:keyword",
  name: "Search",
  component: Home,
};

const loginPage = {
  path: "/login",
  name: "Login",
  component: Login,
};

// const loginRedirectPage = {
//   path: "/login/redirect",
//   name: "Login Redirect",
//   component: LoginRedirect,
// };

const registrationPage = {
  path: "/register",
  name: "Register",
  component: Register,
};

const newPasswordPage = {
  path: '/password/reset/:token',
  name: "Reset Password",
  component: NewPassword
}

const forgotPasswordPage = {
  path: "/password/forgot",
  name: "Forgot Password",
  component: ForgotPassword,
}

const cartPage = {
  path: '/cart',
  name: 'Cart',
  component: Cart
}


// --- Protected Routes ---
const profilePage = {
  path: "/me",
  name: "Profile",
  // isAdmins: false,
  component: Profile,
};

const updateProfilePage = {
  path: "/me/update",
  name: "Update Profile",
  // isAdmins: false,
  component: UpdateProfile,
}

const updatePasswordPage = {
  path: "/password/update",
  name: "Update Password",
  // isAdmins: false,
  component: UpdatePassword,
};

const shippingPage = {
  path: '/shipping',
  name: 'Shipping',
  // isAdmins: false,
  component: Shipping
}

const confirmOrderPage = {
  path: '/order/confirm',
  name: 'Confirm Order',
  // isAdmins: false,
  component: ConfirmOrder
}

const paymentPage = {
  path: '/payment',
  name: 'Payment',
  // isAdmins: false,
  component: Payment
}

const orderSuccessPage = {
  path: '/order/success',
  name: 'Order Success',
  // isAdmins: false,
  component: OrderSuccess
}

const ordersPage = {
  path: '/orders/me',
  name: 'Orders',
  // isAdmins: false,
  component: ListOrders
}

const orderDetailsPage = {
  path: '/order/:id',
  name: 'Order Details',
  // isAdmins: false,
  component: OrderDetails
}

// --- Admin Routes
const dashboard = {
  path: '/dashboard',
  name: 'Dashboard',
  isAdmins: true,
  component: Dashboard
}

const adminProductsList = {
  path: '/admin/products',
  name: 'Admin Products List',
  isAdmins: true,
  component: ProductsList
}

const addNewProduct = {
  path: '/admin/product',
  name: 'Add New Product',
  isAdmins: true,
  component: NewProduct
}

const updateProductPage = {
  path: '/admin/product/:id',
  name: 'Update Product',
  isAdmins: true,
  component: UpdateProduct
}

const allOrdersList = {
  path: '/admin/orders',
  name: 'All Orders',
  isAdmins: true,
  component: OrdersList
}

const updateOrderPage = {
  path: '/admin/order/:id',
  name: 'Update Order',
  isAdmins: true,
  component: ProcessOrder
}

const allUsers = {
  path: '/admin/users',
  name: 'All Users',
  isAdmins: true,
  component: UsersList
}

const updateUserPage = {
  path: '/admin/user/:id',
  name: 'Update User',
  isAdmins: true,
  component: UpdateUser
}

const productReviewsPage = {
  path: '/admin/reviews',
  name: 'Product Reviews',
  isAdmins: true,
  component: ProductReviews
}

const easterEggPage = {
  path: '/admin/easteregg',
  name: 'Easter Egg',
  isAdmins: true,
  component: EasterEgg
}

export const publicRoutes = [
  homePage,
  productDetailsPage,
  searchPage,
  loginPage,
  registrationPage,
  forgotPasswordPage,
  newPasswordPage,
  cartPage,

];

export const protectedRoutes = [
  profilePage,
  updateProfilePage,
  updatePasswordPage,
  shippingPage,
  paymentPage,
  confirmOrderPage,
  orderSuccessPage,
  ordersPage,
  orderDetailsPage,


];

export const dashboardRoutes = [
  dashboard,
  adminProductsList,
  addNewProduct,
  updateProductPage,
  allOrdersList,
  updateOrderPage,
  allUsers,
  updateUserPage,
  productReviewsPage,
  easterEggPage,

]
