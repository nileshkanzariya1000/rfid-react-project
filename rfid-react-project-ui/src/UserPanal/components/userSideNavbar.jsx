import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
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
import { getUserSubjects } from "../service/api"; // Import the API call

const UserSideNavbar = ({ isOpen, setIsOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const { user_name } = JSON.parse(Cookies.get("user_data") || "{}");
  if (!user_name) throw new Error("User not logged in");



  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectData = await getUserSubjects(); // Fetch user subjects
        setSubjects(subjectData.data);
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
      }
    };

    fetchSubjects();
  }, []);

  const handleLogout = () => {
    Cookies.remove("user_data");
    window.location.href = "/UserLogin";
  };

  return (
    <div className={`h-screen bg-black text-white p-4 ${isOpen ? "w-72" : "w-16"} flex flex-col transition-all duration-300 fixed top-0 left-0 z-50`}>
      {/* Title Row */}
      <div className="flex items-center justify-between mb-4">
        {isOpen && <h1 className="text-2xl font-bold">User Dashboard</h1>}
        <button onClick={() => setIsOpen(!isOpen)}>
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        {isOpen ? (
          <input type="text" placeholder="Search..." className="w-full p-2 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none" />
        ) : (
          <div className="flex justify-center">
            <MagnifyingGlassIcon className="w-6 h-6 cursor-pointer hover:text-green-500" />
          </div>
        )}
      </div>

      {/* Menu Items */}
      <ul className="space-y-3 flex-1">
        <Link to="UserEditProfile">
          <li className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedMenu === "editProfile" ? "bg-green-500" : "hover:text-green-500"}`} onClick={() => setSelectedMenu("editProfile")}>
            <PencilSquareIcon className="w-6 h-6" />
            {isOpen && <span>Edit Profile</span>}
          </li>
        </Link>
        <Link to="UserEditPassword">
          <li className={`flex items-center gap-2 cursor-pointer p-2 rounded ${selectedMenu === "editPassword" ? "bg-green-500" : "hover:text-green-500"}`} onClick={() => setSelectedMenu("editPassword")}>
            <KeyIcon className="w-6 h-6" />
            {isOpen && <span>Edit Password</span>}
          </li>
        </Link>

        {/* View Subjects Dropdown */}
        <li>
          <div className={`flex items-center justify-between cursor-pointer p-2 rounded ${selectedMenu === "viewSubject" ? "bg-green-500" : "hover:text-green-500"}`} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <span className="flex items-center gap-2">
              <BookOpenIcon className="w-6 h-6" />
              {isOpen && <span>View Subjects</span>}
            </span>
            {isOpen && <span>{isDropdownOpen ? "▲" : "▼"}</span>}
          </div>
          {isDropdownOpen && isOpen && subjects.length > 0 && (
            <ul className="pl-6 mt-2 space-y-2">
              {subjects.map((subject) => (
                <Link to={`subject/${subject.ct_id}/${encodeURIComponent(subject.subject_name)}`} className="text-white" key={subject.ct_id}>
                  <li className={`cursor-pointer p-2 rounded ${selectedMenu === subject.ct_id ? "bg-green-400" : "hover:text-green-400"}`} onClick={() => setSelectedMenu(subject.ct_id)}>
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

       
      </ul>

      {/* Logout Button */}
      <div className="mb-4">
        <li className="flex items-center gap-2 cursor-pointer p-2 rounded hover:text-red-500" onClick={handleLogout}>
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          {isOpen && <span>Logout</span>}
        </li>
      </div>

      {/* Profile Section */}
      {isOpen && (
        <div className="flex items-center bg-gray-800 p-2 rounded-lg">
          <UserIcon className="w-10 h-10 text-white" />
          <div className="ml-3">
            <p className="font-bold">{user_name}</p>
            <p className="text-sm text-gray-400">User</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSideNavbar;
