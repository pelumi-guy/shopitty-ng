import React, { Fragment } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Sidebar from "../admin/Sidebar";

const DashboardLayout = ({ children }) => {
  return (
    <Fragment>
      <Header />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">{children}</div>
      </div>


      {/* <Footer /> */}
    </Fragment>
  );
};

export default DashboardLayout;
