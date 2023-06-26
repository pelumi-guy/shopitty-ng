import React, { Fragment, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import MetaData from "../Metadata";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productActions";
import Product from "./product/Product";
import Loader from "./layout/Loader";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import { useLocation, useParams } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
// import Counter from "./layout/Counter";

// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const RangeSlider = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const location = useLocation();

  const {
    loading,
    products,
    productCount,
    resPerPage,
    error,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 1000]);
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);

  const categories = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];

  const keyword = params.keyword;

  useEffect(() => {
    if (error) {
      // alert.success('success');
      alert.error(error);
    }

    dispatch(getProducts(currentPage, keyword, price, category, rating));

    // console.log({ products });

    if (count <= resPerPage) setCurrentPage(1);
  }, [dispatch, alert, error, currentPage, keyword, price, category, rating]);

  const setCurrentPageNo = (pageNumber) => setCurrentPage(pageNumber);

  let count = productCount;
  if (keyword) count = filteredProductsCount;


  // const increaseprice = () => {
  //   const count = document.querySelector(".count");

  //   // if (count.valueAsNumber >= product.stock) return;

  //   const newPrice = count.valueAsNumber + 1;
  //   setPrice([newPrice, price[1]]);
  // };

  // const decreaseprice = () => {
  //   const count = document.querySelector(".count");

  //   // if (count.valueAsNumber <= 1) return;

  //   const newPrice = count.valueAsNumber - 1;
  //   setPrice([newPrice, price[1]]);
  // };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Best prices you can ask for"} />

          <div className="row">
            <h1 id="products_heading">Latest Products</h1>
          </div>

          <section id="products" className="container mt-5">
            <div className="row">
              {keyword ? (
                <Fragment>
                  <div className="col-6 col-md-3 mt-5 mb-5">
                    <div className="row">

                      {/* ---Prices filter--- */}
                      <h4 className="mb-3">Prices</h4>
                      <div className="px-3">
                        <Slider
                          range
                          marks={{
                            1: "₦1",
                            1000: "₦1000",
                          }}
                          min={1}
                          max={1000}
                          defaultValue={[1, 1000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{
                            placement: "top",
                            visible: false,
                          }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                        />
                      </div>
                    </div>
                    <br />

                    {/* <div className="row">
                          < Counter val={ price[0] } incrementer={increaseprice} decrementer={decreaseprice} />
                    </div> */}

                    {/* ---Categories filter--- */}
                    <hr className="my-5" />
                    <h4 className="mb-3">Categories</h4>
                    <ul className="pl-0">
                      {categories.map((category) => (
                        <li
                          key={category}
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          onClick={() => setCategory(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>

                    {/* ---Ratings filter--- */}
                    <hr className="mb-5" />
                    <h4 className="mb-3">Ratings</h4>
                    <ul className="pl-0">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <li
                          key={star}
                          style={{ cursor: "pointer", listStyleType: "none" }}
                          onClick={() => setRating(star)}
                        >
                          <div className="rating-outer">
                            <div
                              className="rating-inner"
                              style={{ width: `${star * 20}%` }}
                            ></div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="col-6 col-md-9">
                    <div className="row">
                      {products.map((product) => (
                        <Product product={product} key={product._id} col={4} />
                      ))}
                    </div>
                  </div>
                </Fragment>
              ) : (
              //   products && products.map((product) => (
              //   <Product product={product} key={product._id} col={3} />
              // ))
              <Fragment>
                {products && products.map((product) => (
                  <Product product={product} key={product._id} col={3} />
                ))}
              </Fragment>
              )}
            </div>
          </section>

          {/* <div className="d-flex row text-center">
            {products &&
              products.map((product) => (
                <Product product={product} key={product._id} col={3} />
              ))}
          </div> */}
        </Fragment>
      )}

      {resPerPage <= count && (
        <div className="d-flex justify-content-center">
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={resPerPage}
            totalItemsCount={productCount}
            onChange={setCurrentPageNo}
            pageRangeDisplayed={2}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            // firstPageText={'First'}
            // lastPageText={'Last'}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
