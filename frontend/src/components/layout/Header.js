import React from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Search from './Search';

const Header = () => {
  return (
    <nav className="navbar row">
                {/* --Shopit logo-- */}
                <div className="col-12 col-md-3">
                    <div className="navbar-brand">
                        <Link to="/">
                            <img src="/images/shopit_logo.png" />
                        </Link>
                    </div>
                </div>

                {/* --Search bar-- */}
                <div className="col-12 col-md-6 mt-2 mt-md-0">
                    {/* <Route render={({ history }) => <Search history={history} />} /> */}
                    < Search />

                </div>



                {/* --Cart Button-- */}
                <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">

                        {/* --Login button-- */}
                        <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>

                    {/* <Link to="/cart" style={{ textDecoration: 'none' }} > */}
                        <span id="cart" className="ml-3">Cart</span>
                        <span className="ml-1" id="cart_count">
                          {/* {cartItems.length} */}
                          2
                        </span>
                    {/* </Link> */}

                    {/* {user ? ( */}
                        <div className="ml-4 dropdown d-inline">
                            {/* <Link to="#!" className="btn dropdown-toggle text-white mr-4" type="button" id="dropDownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">

                                <figure className="avatar avatar-nav">
                                    <img
                                        src={user.avatar && user.avatar.url}
                                        alt={user && user.name}
                                        className="rounded-circle"
                                    />
                                </figure>
                                <span>{user && user.name}</span>
                            </Link> */}

                            <div className="dropdown-menu" aria-labelledby="dropDownMenuButton">

                                {/* {user && user.role === 'admin' && (
                                    <Link className="dropdown-item" to="/dashboard">Dashboard</Link>
                                )}
                                <Link className="dropdown-item" to="/orders/me">Orders</Link>
                                <Link className="dropdown-item" to="/me">Profile</Link>
                                <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                    Logout
                                </Link> */}

                            </div>


                        </div>

                    {/* ) : !loading && <Link to="/login" className="btn ml-4" id="login_btn">Login</Link>} */}


                </div>
            </nav>
  )
}

export default Header