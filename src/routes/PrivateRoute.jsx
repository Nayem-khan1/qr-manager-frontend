import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../context/AuthProvider";
import Loader from "../components/Loader";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh]">
        <Loader/>
      </div>
    );
  }
  if (user && user.uid) {
    return children;
  }

  return <Navigate to="/sign-in" replace />;
};

export default PrivateRoute;
