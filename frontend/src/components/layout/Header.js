import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Search from "./Search";
import Loader from "./Loader";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";

const Header = () => {
  const dispatch = useDispatch();

  const { loading, user } = useSelector((state) => state.authentication);
  const { cartItems } = useSelector((state) => state.cart);

  //   const [isOpen, setIsOpen] = useState(false);

  //   const toggleDropDown = () => setIsOpen(!isOpen)
  //   const menuClass = `dropdown-menu${isOpen ? "show" : ""}`;

  const logoutHandler = () => {
    dispatch(logout());
  };

  // useEffect(() => {
  //   console.log({user});
  // }, [loading])

  return (
    <nav className="navbar row">
      {/* --Shopit logo-- */}
      <div className="col-12 col-md-3 pl-3 text-center">
        <div className="navbar-brand">
          <Link to="/">
            <img src="/images/shopit_logo.png"
            className="img-fluid"
            // height={149} width={58}
            />
          </Link>
        </div>
      </div>

      {/* --Search bar-- */}
      <div className="col-12 col-md-6 mt-2 mt-md-0 text-center">
        {/* <Route render={({ history }) => <Search history={history} />} /> */}
        <Search />
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 mx-0 text-center">
        {/* --My Login button-- */}
        {/* <Link to="/login" className="btn ml-4" id="login_btn">Login</Link> */}

        {/* --Cart Button-- */}
        <div className="row align-items-center">
          <div className="col-4">
            <Link to="/cart"
            style={{ textDecoration: "none" }}
            // className="show-edge"
            >
              <div className="pl-4">
              <span id="cart" className="ml-1">
                Cart
              </span>
              <span className="ml-2" id="cart_count">
                {cartItems.length}
              </span>
              </div>
            </Link>
          </div>

          <div className="col-6">
            {
            loading ? (
              <Loader className={'loader-no-margin scale-down'} forHeader />
            ) : (
              <Fragment>
                {user ? (
                  <div className="dropdown show d-inline">
                    <Link
                      to="#!"
                      className="btn dropdown-toggle text-white mr-4"
                      role="button"
                      id="dropdownMenuLink"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      style={{ border: 0 }}
                    >
                      <figure className="avatar avatar-nav">
                        <img
                          src={user.avatar && user.avatar.url}
                          alt={user && user.name}
                          className="rounded-circle"
                        />
                      </figure>
                      <span>{user && user.name}</span>
                    </Link>

                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      {user && user.role === "admin" && (
                        <Link className="dropdown-item" to="/dashboard">
                          Dashboard
                        </Link>
                      )}
                      <Link className="dropdown-item" to="/orders/me">
                        Orders
                      </Link>
                      <Link className="dropdown-item" to="/me">
                        Profile
                      </Link>
                      <Link
                        className="dropdown-item text-danger"
                        to="/"
                        onClick={logoutHandler}
                      >
                        Logout
                      </Link>
                      {user && user.role === "admin" && (
                        <Link className="dropdown-item" to="/admin/easteregg">
                          Easter Egg
                        </Link>
                      )}
                    </div>
                  </div>
                ) : (
                  !loading && (
                    <Link to="/login" className="btn ml-4" id="login_btn">
                      Login
                    </Link>
                  )
                )}
              </Fragment>
            )
            }
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
