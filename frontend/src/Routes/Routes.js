import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { landing } from "./index";
import layout from "../components/layout";

const childRoutes = (Layout, routes) =>
  routes.map(
    (
      { children, path, Component, name }, index
    ) =>
      children ? (
        // Route item with children
        children.map(
          (
            { path, Component, name }, index
          ) => (
            <Route
              key={index}
              path={path}
              element={
                <Layout>
                    <Component ComponentName={name} />
                </Layout>
              }
            />
          )
        )
      ) : (
        // Route item without children
        <Route
          key={index}
          path={path}
          element={
            <Layout>
                <Component ComponentName={name} />
            </Layout>
          }
        />
      )
  );

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {childRoutes(layout, landing)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;