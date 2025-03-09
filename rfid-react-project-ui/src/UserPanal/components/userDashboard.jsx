import React, { useState } from "react";
import UserSideNavbar from "./userSideNavbar";
import UserEditProfile from "./userEditProfile";
 import UserEditPassword from "./UserEditPassword";
 import UserSubjectDetail from "./UserSubjectDetail";
// import ViewSubject from "./ViewSubject";
// import AddNewSubject from "./AddNewSubject";

const UserDashboard = () => {
  const [selectedItem, setSelectedItem] = useState("Welcome");
    const [selectedSubject, setSelectedSubject] = useState(null);
  

  const handleSelectItem = (item) => {
    setSelectedItem(item); // Update selected item and render the corresponding component
  };
  const handleSelectSubject = (ct_id, subject_name) => {
    setSelectedSubject({ ct_id, subject_name }); // Set selected subject
    setSelectedItem("ViewSubject"); // Show subject details when a subject is selected
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (always visible) */}
      <UserSideNavbar onSelectItem={handleSelectItem} onSelectSubject={handleSelectSubject}/>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Conditionally Render the Selected Component */}
        {selectedItem === "EditProfile" && <UserEditProfile />}
        {selectedItem === "EditPassword" && <UserEditPassword />}
        {selectedItem === "ViewSubject" && selectedSubject && (
          <UserSubjectDetail
            ct_id={selectedSubject.ct_id}
            subject_name={selectedSubject.subject_name}
          />
        )}
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
