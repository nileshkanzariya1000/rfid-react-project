import React from 'react';
import TokensDetails from './getTokenForClient';
import { Outlet, useLocation } from "react-router-dom";

const AddNewSubject = () => {
  const location = useLocation();

  // Check if a route is active inside the Outlet
  const isOutletActive = location.pathname.includes("ProcideToAdd");

  return (
    <div>
      {!isOutletActive && <TokensDetails />} {/* Conditionally render TokensDetails */}
      <Outlet />
    </div>
  );
};

export default AddNewSubject;
