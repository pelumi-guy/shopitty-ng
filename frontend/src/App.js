import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import "./my-styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from "./components/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppRoutes from "./Routes/Routes";
import { reloadUser } from "./actions/authActions";
import store from "./store";

function App() {

  // const dispatch = useDispatch();

  useEffect(() => {
    store.dispatch(reloadUser());
  }, []);

  return (
    // <Router>
    //   <div className="App">
    //     {/* <Header /> */}
    //     <div className="container container-fluid">
    //       {/* <Routes>
    //         <Route path="/" element={<Home />}></Route>
    //       </Routes> */}

    //     </div>
    //     {/* <Footer /> */}
    //   </div>
    // </Router>

    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
