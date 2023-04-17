import Home from "../components/Home";
import ProductDetails from "../components/product/ProductDetails";
import Login from "../components/user/Login";
import LoginRedirect from "../components/user/LoginRedirect";
import Register from "../components/user/Register";
import Profile from "../components/user/Profile";
import UpdateProfile from "../components/user/UpdateProfile";
import UpdatePassword from "../components/user/UpdatePassword";
import ForgotPassword from "../components/user/ForgotPassword";
import NewPassword from "../components/user/NewPassword";

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

const loginRedirectPage = {
  path: "/login/redirect",
  name: "Login Redirect",
  component: LoginRedirect,
};

const registrationPage = {
  path: "/register",
  name: "Register",
  component: Register,
};

const profilePage = {
  path: "/me",
  name: "Profile",
  isAdmins: false,
  component: Profile,
};

const updateProfilePage = {
  path: "/me/update",
  name: "Update Profile",
  isAdmins: false,
  component: UpdateProfile,
}

const updatePasswordPage = {
  path: "/password/update",
  name: "Update Password",
  isAdmins: false,
  component: UpdatePassword,
};

const forgotPasswordPage = {
  path: "/password/forgot",
  name: "Forgot Password",
  component: ForgotPassword,
}

const newPasswordPage = {
  path: '/password/reset/:token',
  name: "Reset Password",
  component: NewPassword

}

export const publicRoutes = [
  homePage,
  productDetailsPage,
  searchPage,
  loginPage,
  loginRedirectPage,
  registrationPage,
  forgotPasswordPage,
  newPasswordPage,

];

export const protectedRoutes = [
  profilePage,
  updateProfilePage,
  updatePasswordPage

];
