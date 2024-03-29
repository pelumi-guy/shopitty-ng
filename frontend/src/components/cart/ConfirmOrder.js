import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import MetaData from "../../Metadata";
import CheckoutSteps from "./CheckoutSteps";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";

// import { loadUser } from "../../actions/authActions";
// import Loader from "../layout/Loader";

import { CLEAR_ORDER_ERRORS } from "../../reducers/orderReducer";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector(state => state.authentication);
  const { error } = useSelector((state) => state.order);

  const [loadingPayment, setLoadingPayment] = useState(false);

  // Calculate Order Prices
  const itemsPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 200 ? 0 : 25;
  const taxPrice = Number((0.05 * itemsPrice).toFixed(2));
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const processToPayment = async () => {
    setLoadingPayment(true);

    const data = {
      itemsPrice: itemsPrice.toFixed(2),
      shippingPrice,
      taxPrice,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    const transactionDetails = await axios.post(
      "/api/v1/payment/process",
      { amount: Math.ceil(totalPrice * 100) },
      config
    );

    const paymentPage = transactionDetails.data.redirect;

    // console.log('paymentPage: ', transactionDetails.data.redirect);

    // window.location.replace(paymentPage);
    window.location.href = paymentPage;
  };

  useEffect(() => {
    // if (!user) {
    //   dispatch(loadUser());
    // }

    // if (!loading && !isAuthenticated){
    //     navigate('/login?redirect=');
    // }

    if (error) {
      alert.error(error);
      dispatch({ type: CLEAR_ORDER_ERRORS });
    }
  }, []);

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user && user.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b>{" "}
            {`${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.postalCode}, ${shippingInfo.country}`}
          </p>

          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems.map((item) => (
            <Fragment key={item.product}>
              <hr />
              <div className="cart-item my-1">
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img src={item.image} alt="Laptop" height="45" width="65" />
                  </div>

                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item.quantity} x ₦{item.price.toLocaleString()} ={" "}
                      <b>{(item.quantity * item.price).toLocaleString()}</b>
                    </p>
                  </div>
                </div>
              </div>
              <hr />
            </Fragment>
          ))}
        </div>

        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal:{" "}
              <span className="order-summary-values">₦{itemsPrice.toLocaleString()}</span>
            </p>
            <p>
              Shipping:{" "}
              <span className="order-summary-values">₦{shippingPrice.toLocaleString()}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">₦{taxPrice.toLocaleString()}</span>
            </p>

            <hr />

            <p>
              Total: <span className="order-summary-values">₦{totalPrice.toLocaleString()}</span>
            </p>

            <hr />
            <button
              id="checkout_btn"
              className="btn btn-primary btn-block"
              onClick={processToPayment}
              disabled={loadingPayment}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
