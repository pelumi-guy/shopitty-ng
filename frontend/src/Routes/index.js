import Home from "../components/Home"
import ProductDetails from "../components/product/ProductDetails";
import Login from "../components/auth/Login";

const homePage = {
  path: '/',
  name: 'Home',
  Component: Home
}

const productDetailsPage = {
  path: '/product/:id',
  name: 'Product Details',
  Component: ProductDetails
}

const searchPage = {
  path: '/search/:keyword',
  name: 'Search',
  Component: Home
}

const loginPage = {
  path: '/login',
  name: 'Login',
  Component: Login
}

export const landing = [homePage, productDetailsPage, searchPage, loginPage];