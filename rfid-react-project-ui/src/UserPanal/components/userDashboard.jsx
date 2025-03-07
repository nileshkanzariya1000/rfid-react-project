import React, { useState } from "react";
import UserSideNavbar from "./userSideNavbar";
import UserEditProfile from "./userEditProfile";
// import UserEditPassword from "./UserEditPassword";
// import ViewSubject from "./ViewSubject";
// import AddNewSubject from "./AddNewSubject";

const UserDashboard = () => {
  const [selectedItem, setSelectedItem] = useState("Welcome");

  const handleSelectItem = (item) => {
    setSelectedItem(item); // Update selected item and render the corresponding component
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (always visible) */}
      <UserSideNavbar onSelectItem={handleSelectItem} />

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Conditionally Render the Selected Component */}
        {selectedItem === "EditProfile" && <UserEditProfile />}
        {/* {selectedItem === "EditPassword" && <UserEditPassword />} */}
        {/* {selectedItem === "ViewSubject" && <ViewSubject />} */}
        {/* {selectedItem === "AddNewSubject" && <AddNewSubject />} */}
        {selectedItem === "Logout" && (
          <div>
            <h1>You have logged out!</h1>
          </div>
        )}
        {selectedItem === "Welcome" && (
          <>
            <h1 className="text-3xl font-bold">Welcome to the Dashboard</h1>
            <p>This is the main content area.</p>
          </>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
