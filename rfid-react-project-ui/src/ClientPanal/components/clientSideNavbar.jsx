import { useEffect, useState } from "react";
import { getClientSubjects } from "../service/api";
import Cookies from 'js-cookie';
import { 
  Bars3Icon, 
  PencilSquareIcon, 
  KeyIcon, 
  BookOpenIcon, 
  PlusIcon, 
  ArrowLeftOnRectangleIcon, 
  MagnifyingGlassIcon, 
  UserIcon 
} from "@heroicons/react/24/solid";

const ClientSideNavbar = ({ onSelectItem,onSelectSubject }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [subjectOpen, setSubjectOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(""); // Track selected item
  const [subjects, setSubjects] = useState([]); // Store subjects from API
  const clientData = Cookies.get("client_data");
      if (!clientData) throw new Error("Client not logged in");
  
      const { client_name } = JSON.parse(clientData);
  // Fetch subjects when the component mounts
  useEffect(() => {
    async function fetchSubjects() {
      try {
        const response = await getClientSubjects();
        if (response.success) {
          setSubjects(response.data); // Extract `data` from response
        } else {
          console.error("Failed to fetch subjects:", response);
        }
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    }

    fetchSubjects();
  }, []);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    onSelectItem(item);
  };

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
        <li
          className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedItem === "EditProfile" ? "bg-green-500 text-white" : "hover:text-green-500"}`}
          onClick={() => handleSelectItem("EditProfile")}
        >
          <PencilSquareIcon className="w-6 h-6" />
          {isOpen && <span>Edit Profile</span>}
        </li>

        <li
          className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedItem === "EditPassword" ? "bg-green-500 text-white" : "hover:text-green-500"}`}
          onClick={() => handleSelectItem("EditPassword")}
        >
          <KeyIcon className="w-6 h-6" />
          {isOpen && <span>Edit Password</span>}
        </li>

        {/* View Subject Dropdown */}
        <li>
          <div
            className={`flex items-center justify-between cursor-pointer p-2 rounded ${selectedItem === "ViewSubject" ? "bg-green-500 text-white" : "hover:text-green-500"}`}
            onClick={() => setSubjectOpen(!subjectOpen)}
          >
            <span className="flex items-center gap-2">
              <BookOpenIcon className="w-6 h-6" />
              {isOpen && <span>View Subject</span>}
            </span>
            {isOpen && <span>{subjectOpen ? "▼" : "▶"}</span>}
          </div>
          {isOpen && subjectOpen && (
            <ul className="pl-6 mt-2 space-y-2">
              {subjects.length > 0 ? (
                subjects.map((subject) => (
                  <li 
                    key={subject.ct_id} 
                    className={`cursor-pointer p-2 rounded ${selectedItem === subject.subject_name ? "bg-green-500 text-white" : "hover:text-green-400"}`}
                    onClick={() => onSelectSubject(subject.ct_id, subject.subject_name)} // Pass subject details to parent component
                  >
                    {subject.subject_name}
                  </li>
                ))
              ) : (
                <li className="text-gray-500">No subjects found</li>
              )}
            </ul>
          )}
        </li>


        <li
          className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedItem === "AddNewSubject" ? "bg-green-500 text-white" : "hover:text-green-500"}`}
          onClick={() => handleSelectItem("AddNewSubject")}
        >
          <PlusIcon className="w-6 h-6" />
          {isOpen && <span>Add New Subject</span>}
        </li>
      </ul>

      {/* Logout Button */}
      <div className="mb-4">
        <li
          className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedItem === "Logout" ? "bg-red-500 text-white" : "hover:text-red-500"}`}
          onClick={() => handleSelectItem("Logout")}
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
            <p className="text-sm text-gray-400">Student</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSideNavbar;
