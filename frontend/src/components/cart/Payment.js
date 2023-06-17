import React, { useEffect } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../../actions/authActions";

import { PAYMENT_FAILED } from "../../reducers/orderReducer";

import axios from "axios";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const { isAuthenticated, loading, user } = useSelector(
  //   (state) => state.authentication
  // );

  useEffect(() => {
    // if (!user) {
    //   dispatch(loadUser());
    // }

    // if (!loading && !isAuthenticated) {
    //   navigate("/login?redirect=");
    //   return;
    // }

    async function verifyPayment() {
      if (location.search) {
        var ref = location.search.split("=")[1].split("&")[0];
      }
      const verfication = await axios.get(`/api/v1/payment/verify/${ref}`);

      // console.log("verification: ", verfication);
      if (!verfication.data.success) {
        dispatch({
          type: PAYMENT_FAILED,
          payload: "Transaction could not be completed",
        });

        navigate("/order/confirm");
        return
      }

      const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
      orderInfo.paymentRef = ref;
      sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));

      navigate("/order/success");
    }

    verifyPayment();
  }, []);

  //   if (!loading && !isAuthenticated) {
  //     return <Navigate to="/login?redirect=" />;
  //   }

  //   return loading ? <Loader /> : <Navigate to="/order/success" />;
  return null;
};

export default Payment;
