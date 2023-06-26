import React, { Fragment, useEffect } from "react";
import MetaData from "../../Metadata";
import Loader from "../layout/Loader";
import { Link } from "react-router-dom";
import { getAdminProducts } from "../../actions/productActions";
import { allOrders } from "../../actions/orderActions";
import { useDispatch, useSelector } from "react-redux";
import { allUsers } from "../../actions/authActions";


const Dashboard = () => {

  const dispatch = useDispatch();

  const { products } = useSelector(state => state.products)
  const { loading, orders, totalAmount } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;
  for (const product of products) {
    if (product.stock === 0) {
      outOfStock++;
    }
  }

  useEffect(() => {
    dispatch(getAdminProducts());
    dispatch(allOrders());
    dispatch(allUsers());
  }, [dispatch])

  return (
    <Fragment>
      <h1 className="my-4">Dashboard</h1>

      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Admin Dashboard"} />

          <div className="row pr-4">
            <div className="col-xl-12 col-sm-12 mb-3">
              <div className="card text-white bg-primary o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Total Amount
                    <br />
                    <b>
                    ₦{totalAmount && totalAmount.toLocaleString()}
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row pr-4">
            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-success o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Products
                    <br />{" "}
                    <b>
                      {products && products.length}
                    </b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/products"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-danger o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Orders
                    <br />{" "}
                    <b>
                      {orders && orders.length}
                    </b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/orders"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-info o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Users
                    <br />{" "}
                    <b>
                      {users && users.length}
                    </b>
                  </div>
                </div>
                <Link
                  className="card-footer text-white clearfix small z-1"
                  to="/admin/users"
                >
                  <span className="float-left">View Details</span>
                  <span className="float-right">
                    <i className="fa fa-angle-right"></i>
                  </span>
                </Link>
              </div>
            </div>

            <div className="col-xl-3 col-sm-6 mb-3">
              <div className="card text-white bg-warning o-hidden h-100">
                <div className="card-body">
                  <div className="text-center card-font-size">
                    Out of Stock
                    <br />{" "}
                    <b>
                      {outOfStock}
                    </b>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Dashboard;
