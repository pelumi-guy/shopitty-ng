import React, { Fragment, useEffect, useState } from "react";

import MetaData from "../../Metadata";

import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import Loader from "../layout/Loader";
import PencilIcon from "./icons/PencilIcon";
import DeleteIcon from "../cart/icons/DeleteIcon";
import { MDBDataTable } from "mdbreact";

import { Link } from "react-router-dom";
import { DELETE_PRODUCT_RESET } from "../../reducers/productReducer";
import {
  getAdminProducts,
  clearProductErrors,
  deleteProduct,
  clearAlterProductErrors,

} from "../../actions/productActions";

const ProductsList = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.alterProduct)

  useEffect(() => {
    dispatch(getAdminProducts());

    if (error) {
      alert.error(error);
      dispatch(clearProductErrors());
    }

    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearAlterProductErrors());
    }

    if (isDeleted) {
      alert.success('Product deleted successfully');
      navigate('/admin/products');
      dispatch({ type: DELETE_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, deleteError, isDeleted]);

  const setProducts = () => {
    const data = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Price",
          field: "price",
          sort: "asc",
        },
        {
          label: "Stock",
          field: "stock",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    products.forEach((product) => {
      data.rows.push({
        id: product._id,
        name: product.name,
        price: `₦${product.price.toLocaleString()}`,
        stock: product.stock,
        actions: (
          <Fragment>
            <Link
              to={`/admin/product/${product._id}`}
              className="btn btn-primary py-1"
            >
              <PencilIcon />
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => deleteProductHandler(product._id)}
            >
              <DeleteIcon />
            </button>
          </Fragment>
        ),
      });
    });

    return data;
  };

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <Fragment>
      <MetaData title={"All Products"} />
      <h1 className="my-5">All Products</h1>(
      {loading ? (
        <Loader />
      ) : (
        <MDBDataTable
          data={setProducts()}
          className="px-3"
          bordered
          striped
          hover
        />
      )}
      )
    </Fragment>
  );
};

export default ProductsList;
