import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bars3Icon, PencilSquareIcon, KeyIcon, BookOpenIcon, PlusIcon, ArrowLeftOnRectangleIcon, UserIcon, MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { getClientSubjects } from "../service/api"; // Importing the API call

const ClientSideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true); // State to manage sidebar open/close
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown open/close
  const [subjects, setSubjects] = useState([]); // State to store the fetched subjects

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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

  return (
    <div className={`h-screen bg-black text-white p-4 ${isOpen ? "w-72" : "w-16"} flex flex-col transition-all duration-300`}>
      {/* Title Row with Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        {isOpen && <h1 className="text-2xl font-bold">Dashboard</h1>}
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
        <li className="flex items-center gap-2 cursor-pointer p-2 rounded hover:text-green-500">
          <PencilSquareIcon className="w-6 h-6" />
          {isOpen && <Link to="ClientEditProfile"><span>Edit Profile</span></Link>}
        </li>

        <li className="flex items-center gap-2 cursor-pointer p-2 rounded hover:text-green-500">
          <KeyIcon className="w-6 h-6" />
          {isOpen && <Link to="ClientEditPassword"><span>Edit Password</span></Link>}
        </li>

        {/* View Subject Dropdown */}
        <li>
          <div
            className="flex items-center justify-between cursor-pointer p-2 rounded hover:text-green-500"
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
                <li key={subject.ct_id} className="cursor-pointer p-2 rounded hover:text-green-400">
                  <Link
                      to={`subject/${subject.ct_id}/${encodeURIComponent(subject.subject_name)}`} // Include both ID and name in the URL
                      className="text-white">
               {subject.subject_name}
          </Link>
                </li>
              ))}
            </ul>
          )}
        </li>

        <li className="flex items-center gap-2 cursor-pointer p-2 rounded hover:text-green-500">
          <PlusIcon className="w-6 h-6" />
          {isOpen && <span>Add New Subject</span>}
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mb-4">
        <li className="flex items-center gap-2 cursor-pointer p-2 rounded hover:text-red-500">
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          {isOpen && <span>Logout</span>}
        </li>
      </div>

      {/* Profile Section */}
      {isOpen && (
        <div className="flex items-center bg-gray-800 p-2 rounded-lg">
          <UserIcon className="w-10 h-10 text-white" />
          <div className="ml-3">
            <p className="font-bold">Client Name</p>
            <p className="text-sm text-gray-400">Student</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSideNavbar;
