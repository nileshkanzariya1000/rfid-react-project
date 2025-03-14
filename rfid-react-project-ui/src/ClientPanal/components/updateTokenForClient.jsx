import React from 'react';
import UpdateTokenDetails from './getTokenForUpdate';
import { Outlet, useLocation } from "react-router-dom";

const UpdateTokenForClient = () => {
  const location = useLocation();

  // Check if a route is active inside the Outlet
  const isOutletActive = location.pathname.includes("ProcideToUpdate");

  return (
    <div>
      {!isOutletActive && <UpdateTokenDetails />} {/* Conditionally render TokensDetails */}
      <Outlet />
    </div>
  );
};

export default UpdateTokenForClient;