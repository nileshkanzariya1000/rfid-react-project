import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import {
  Bars3Icon,
  PencilSquareIcon,
  KeyIcon,
  BookOpenIcon,
  PlusIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  MagnifyingGlassIcon,
  PencilIcon,
} from "@heroicons/react/24/solid";
import { getClientSubjects } from "../service/api"; // Importing the API call

const ClientSideNavbar = ({ isOpen, setIsOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true); // State to manage dropdown open/close
  const [subjects, setSubjects] = useState([]); // State to store the fetched subjects
  const [selectedMenu, setSelectedMenu] = useState(null); // State to track the selected menu item
  const { client_name } = JSON.parse(Cookies.get("client_data") || '{}');
  if (!client_name) throw new Error("Client not logged in");

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState); // Toggle the dropdown open/close state
  };

  // Fetch subjects when the component mounts
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectData = await getClientSubjects();
        setSubjects(subjectData.data); // Set subjects in state
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
      }
    };

    fetchSubjects();
  }, []); // Empty dependency array to run this only once when the component mounts

  // Function to handle item selection
  const handleMenuItemClick = (menuItem) => {
    setSelectedMenu(menuItem); // Set the selected menu item
  };

  // Function to handle subject selection
  const handleSubjectClick = (subjectId) => {
    setSelectedMenu(subjectId); // Set the selected subject
  };

  const handleLogout = () => {
    Cookies.remove("client_data"); // Remove the client data cookie
    window.location.href = "/ClientLogin";
  };

  return (
    <div className={`h-screen bg-black text-white p-4 ${isOpen ? "w-72" : "w-16"} flex flex-col transition-all duration-300 fixed top-0 left-0 z-50`}>
      {/* Title Row with Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        {isOpen && <h1 className="text-2xl font-bold">Client Dashboard</h1>}
        <button onClick={() => setIsOpen(!isOpen)}>
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Search Bar / Search Icon */}
      <div className="mb-4">
        {isOpen ? (
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
          />
        ) : (
          <div className="flex justify-center">
            <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer hover:text-green-500" />
          </div>
        )}
      </div>

      {/* Menu Items */}
      <ul className="space-y-3 flex-1">
        <Link to="ClientEditProfile">
          <li
            className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedMenu === "editProfile" ? "bg-green-500" : "hover:text-green-500"}`}
            onClick={() => handleMenuItemClick("editProfile")}
          >
            <PencilSquareIcon className="w-6 h-6" />
            {isOpen && <span>Edit Profile</span>}
          </li>
        </Link>
        <Link to="ClientEditPassword">
          <li
            className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedMenu === "editPassword" ? "bg-green-500" : "hover:text-green-500"}`}
            onClick={() => handleMenuItemClick("editPassword")}
          >
            <KeyIcon className="w-6 h-6" />
            {isOpen && <span>Edit Password</span>}
          </li>
        </Link>
        {/* View Subject Dropdown */}
        <li>
          <div
            className={`flex items-center justify-between cursor-pointer p-2 rounded ${selectedMenu === "viewSubject" ? "bg-green-500" : "hover:text-green-500"}`}
            onClick={toggleDropdown} // Toggle dropdown on click
          >
            <span className="flex items-center gap-2">
              <BookOpenIcon className="w-6 h-6" />
              {isOpen && <span>View Subject</span>}
            </span>
            {isOpen && <span>{isDropdownOpen ? "▲" : "▼"}</span>} {/* Show up or down arrow based on dropdown state */}
          </div>
          {isDropdownOpen && isOpen && subjects.length > 0 && (
            <ul className="pl-6 mt-2 space-y-2">
              {subjects.map((subject) => (
                <Link to={`subject/${subject.ct_id}/${encodeURIComponent(subject.subject_name)}`} className="text-white" key={subject.ct_id}>
                  <li
                    className={`cursor-pointer p-2 rounded ${selectedMenu === subject.ct_id ? "bg-green-400" : "hover:text-green-400"}`}
                    onClick={() => handleSubjectClick(subject.ct_id)}
                  >
                    <div className="flex items-center space-x-2">
                      <PencilIcon className="w-5 h-5 text-red-400" />
                      <span>{subject.subject_name}</span>
                    </div>
                  </li>
                </Link>
              ))}
            </ul>
          )}
        </li>

        <li
          className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedMenu === "addSubject" ? "bg-green-500" : "hover:text-green-500"}`}
          onClick={() => handleMenuItemClick("addSubject")}
        >
          <PlusIcon className="w-6 h-6" />
          {isOpen && <Link to="AddNewSubject"><span>Add New Subject</span></Link>}
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mb-4">
        <li
          className="flex items-center gap-2 cursor-pointer p-2 rounded hover:text-red-500"
          onClick={handleLogout} // Call handleLogout on click
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          {isOpen && <span>Logout</span>}
        </li>
      </div>

      {/* Profile Section */}
      {isOpen && (
        <div className="flex items-center bg-gray-800 p-2 rounded-lg">
          <UserIcon className="w-10 h-10 text-white" />
          <div className="ml-3">
            <p className="font-bold">{client_name}</p>
            <p className="text-sm text-gray-400">Client</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSideNavbar;
