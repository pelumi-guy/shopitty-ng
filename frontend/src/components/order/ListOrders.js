import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../../Metadata";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader";
import Peek from "./icons/Peek";
import { MDBDataTable } from "mdbreact";

import { getOrders, clearUserOrdersErrors } from "../../actions/orderActions";
import { Link } from "react-router-dom";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.userOrders);

  useEffect(() => {
    dispatch(getOrders());

    if (error) {
      alert.error(error);
      dispatch(clearUserOrdersErrors());
    }
  }, [dispatch, alert, error]);

  const setOrders = () => {
    const data = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Num of Items",
          field: "numOfItems",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Status",
          field: "status",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: []
    };

    orders.forEach((order) => {
      data.rows.push({
        id: order._id,
        numOfItems: order.orderItems.length,
        amount: `$${order.totalPrice}`,
        status:
          order.orderStatus &&
          String(order.orderStatus).includes("Delivered") ? (
            <p style={{ color: "green" }}>{order.orderStatus}</p>
          ) : (
            <p style={{ color: "red" }}>{order.orderStatus}</p>
          ),
        actions: (
          <Link to={`/order/${order._id}`} className="btn btn-primary">
            <Peek />
          </Link>
        ),
      });
    });

    return data;
  };

  return (
    <Fragment>
      <MetaData title={"My Orders"} />

      <h1 className="mt-5">My Orders</h1>

      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setOrders()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}

    </Fragment>
  );
};

export default ListOrders;
