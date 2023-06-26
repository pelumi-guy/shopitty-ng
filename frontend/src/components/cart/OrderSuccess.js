import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import MetaData from "../../Metadata";
import { loadUser } from "../../actions/authActions";
import Loader from "../layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "../../actions/cartActions";
import { clearOrderErrors, createOrder } from "../../actions/orderActions";
import { useAlert } from "react-alert";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();

  const { isAuthenticated, loading, user } = useSelector(
    (state) => state.authentication
  );
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { error } = useSelector((state) => state.order);

  const order = {
    orderItems: cartItems,
    shippingInfo,
  };

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  if (orderInfo) {
    order.itemsPrice = orderInfo.itemsPrice;
    order.shippingPrice = orderInfo.shippingPrice;
    order.taxPrice = orderInfo.taxPrice;
    order.totalPrice = orderInfo.totalPrice;
    order.paymentInfo = {
      reference: orderInfo.paymentRef,
      status: "paid",
    };
  }

  useEffect(() => {
    // if (!user) {
    //   dispatch(loadUser());
    // }

    // if (!loading && !isAuthenticated){
    //     navigate('/login?redirect=');
    // }

    dispatch(createOrder(order));

    if (error) {
      alert.error(error);
      dispatch(clearOrderErrors());
    } else {
      dispatch(emptyCart());
    }
  }, [error]);

  return (
    <Fragment>
      <MetaData title={"Order Success"} />

      <div className="row justify-content-center">
        <div className="col-6 mt-5 text-center">
          <img
            className="my-5 img-fluid d-block mx-auto"
            src="/images/order_success.png"
            alt="Order Success"
            width="200"
            height="200"
          />

          <h2>Your Order has been placed successfully.</h2>

          <Link to="/orders/me">Go to Orders</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
