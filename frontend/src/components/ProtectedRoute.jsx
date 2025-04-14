import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element: Component, loggedIn }) {
  return loggedIn ? Component : <Navigate to="/signin" replace />;
}

export default ProtectedRoute;
