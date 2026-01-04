import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
// import NotFound from "../pages/Unauthorized/NotFound";
// import Unauthorized from "../pages/Unauthorized/Unauthorized";

// Layout
import AuthenticatedLayout from "../Layout/AuthenticatedLayout";

// Dashboard
import Dashboard from "../pages/Dashboard/Dashboard";


function AuthenticatedRoutes() {
  return (
    <Routes>
      <Route element={<AuthenticatedLayout />}>
        <Route
          element={<ProtectedRoute allowedPermissions={["Dashboard-View"]} />}
        >
          <Route path="/" element={<Dashboard />} />
        </Route> 
      </Route>

      {/* Unauthorized & 404 */}
      {/* <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default AuthenticatedRoutes;
