import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { publicRoutes, protectedRoutes, dashboardRoutes } from "./index";
import layout from "../components/layout";
import DashboardLayout from "../components/layout/DashboardLayout";
import ProtectedRoute from "../components/route/ProtectedRoute";

const childRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component, name }, index) =>
    children ? (
      // Route item with children
      children.map(({ path, component: Component, name }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <Layout>
              <Component ComponentName={name} />
            </Layout>
          }
        />
      ))
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

const protectedChildRoutes = (Layout, routes) =>
  routes.map(({ children, path, component: Component, name, isAdmin }, index) =>
    children ? (
      // Route item with children

      children.map(({ path, component: Component, name }, index) => (
        <Route
          key={index}
          path={path}
          element={
            <ProtectedRoute isAdmin={isAdmin}>
              <Layout>
                <Component ComponentName={name} />
              </Layout>
            </ProtectedRoute>
          }
        />
      ))
    ) : (
      // Route item without children

      <Route
        key={index}
        path={path}
        element={
          <ProtectedRoute isAdmin={isAdmin}>
            <Layout>
              <Component ComponentName={name} />
            </Layout>
          </ProtectedRoute>
        }
      />
    )
  );

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {childRoutes(layout, publicRoutes)}
        {protectedChildRoutes(layout, protectedRoutes)}
        {protectedChildRoutes(DashboardLayout, dashboardRoutes)}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
