import React from "react";
import { Link } from 'react-router-dom'


const Product = ({ product, col }) => {
  return (
    //   <div className="card col-3 my-3 mx-0">
    //   <img
    //     src="/images/sandisk-memcard.jpg"
    //     className="img-fluid"
    //     alt="Sample Product"
    //   />
    //   <div className="card-body show-edge px-0 mx-0">
    //     <h5 className="card-title px-0">
    //       {/* 128GB Solid Storage Memory card - Sandisk Ultra */}
    //       128GB Memory card - Sandisk Ultra
    //     </h5>
    //     {/* <p className="card-text"></p> */}
    //     <div className="container text-center">
    //       <button className="btn btn-warning theme px-3">View Details</button>
    //     </div>
    //   </div>
    // </div>

    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
            <div className="card p-3 rounded">
                <img
                    className="card-img-top mx-auto"
                    // src={product.images[0].url}
                    src="/images/sandisk-memcard.jpg"
                />
                <div className="card-body d-flex flex-column">
                    <h6 className="card-title">
                        <Link to={`/product/${product._id}`}>{product.name}</Link>
                    </h6>
                    <div className="ratings mt-auto">
                        <div className="rating-outer">
                            <div className="rating-inner" style={{ width: `${(product.ratings / 5) * 100}%` }}></div>
                        </div>
                        <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
                    </div>
                    <p className="card-text">${product.price}</p>
                    <Link to={`/product/${product._id}`} id="view_btn" className="btn btn-block">View Details</Link>
                </div>
            </div>
        </div>
  );
};

export default Product;
