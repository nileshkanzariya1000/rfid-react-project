import React, { useState } from "react";
import ClientSideNavbar from "./clientSideNavbar";
import ClientEditProfile from "./clientEditProfile";
import ClientEditPassword from "./clientEditPassword";
import ClientSubjectDetail from "./clientSubjectDetails";
// import ViewSubject from "./ViewSubject";
// import AddNewSubject from "./AddNewSubject";

const ClientDashboard = () => {
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
      <ClientSideNavbar onSelectItem={handleSelectItem} onSelectSubject={handleSelectSubject} />

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-gray-50">
        {/* Conditionally Render the Selected Component */}
        {selectedItem === "EditProfile" && <ClientEditProfile />}
        {selectedItem === "EditPassword" && <ClientEditPassword />}
        {selectedItem === "ViewSubject" && selectedSubject && (
          <ClientSubjectDetail
            ct_id={selectedSubject.ct_id}
            subject_name={selectedSubject.subject_name}
          />
        )}
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

export default ClientDashboard;
