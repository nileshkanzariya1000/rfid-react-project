import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3Icon as Bars3IconSolid,
  PencilSquareIcon as PencilSquareIconSolid,
  KeyIcon as KeyIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  HomeIcon as HomeIconSolid,
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid,
} from "@heroicons/react/24/solid";
import { getClientSubjects } from "../service/api";

const ClientSideNavbar = ({ isOpen, setIsOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const { client_name } = JSON.parse(Cookies.get("client_data") || "{}");
  if (!client_name) throw new Error("Client not logged in");

  const filteredSubjects = subjects.filter((subject) =>
    subject.subject_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectData = await getClientSubjects();
        setSubjects(subjectData.data || []);
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
      }
    };
    fetchSubjects();
  }, []);

  const handleLogout = () => {
    Cookies.remove("client_data");
    window.location.href = "/ClientLogin";
  };

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div
      className={`h-screen bg-black text-white p-4 ${
        isOpen ? "w-72" : "w-16"
      } flex flex-col transition-all duration-300 fixed top-0 left-0 z-50 shadow-2xl`}
    >
      {/* Title Row */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="bg-gray-800 p-2 rounded-lg">
              <BookOpenIconSolid className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">Client Dashboard</h1>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
        >
          <Bars3Icon className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        {isOpen ? (
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search subjects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 border border-gray-800 transition-all"
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="p-2 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer">
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-300 hover:text-green-500" />
            </div>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <ul className="space-y-2 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {/* Dashboard Home */}
        <Link to="/ClientDashboard">
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-200 ${
              isActive("/ClientDashboard") && location.pathname === "/ClientDashboard"
                ? "bg-green-500 text-white"
                : "hover:bg-gray-800 text-gray-300 hover:text-green-500"
            }`}
          >
            {isActive("/ClientDashboard") && location.pathname === "/ClientDashboard" ? (
              <HomeIconSolid className="w-5 h-5" />
            ) : (
              <HomeIcon className="w-5 h-5" />
            )}
            {isOpen && <span className="font-medium">Dashboard</span>}
          </li>
        </Link>

        {/* Edit Profile */}
        <Link to="/ClientDashboard/ClientEditProfile">
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-200 ${
              isActive("/ClientDashboard/ClientEditProfile")
                ? "bg-green-500 text-white"
                : "hover:bg-gray-800 text-gray-300 hover:text-green-500"
            }`}
          >
            {isActive("/ClientDashboard/ClientEditProfile") ? (
              <PencilSquareIconSolid className="w-5 h-5" />
            ) : (
              <PencilSquareIcon className="w-5 h-5" />
            )}
            {isOpen && <span className="font-medium">Edit Profile</span>}
          </li>
        </Link>

        {/* Change Password */}
        <Link to="/ClientDashboard/ClientEditPassword">
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-200 ${
              isActive("/ClientDashboard/ClientEditPassword")
                ? "bg-green-500 text-white"
                : "hover:bg-gray-800 text-gray-300 hover:text-green-500"
            }`}
          >
            {isActive("/ClientDashboard/ClientEditPassword") ? (
              <KeyIconSolid className="w-5 h-5" />
            ) : (
              <KeyIcon className="w-5 h-5" />
            )}
            {isOpen && <span className="font-medium">Change Password</span>}
          </li>
        </Link>

        {/* Manage Leaves */}
        <Link to="/ClientDashboard/ClientLeaveRequests">
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-200 ${
              isActive("/ClientDashboard/ClientLeaveRequests")
                ? "bg-green-500 text-white"
                : "hover:bg-gray-800 text-gray-300 hover:text-green-500"
            }`}
          >
            {isActive("/ClientDashboard/ClientLeaveRequests") ? (
              <ClipboardDocumentCheckIconSolid className="w-5 h-5" />
            ) : (
              <ClipboardDocumentCheckIcon className="w-5 h-5" />
            )}
            {isOpen && <span className="font-medium">Manage Leaves</span>}
          </li>
        </Link>

        {/* Add New Subject */}
        <Link to="/ClientDashboard/AddNewSubject">
          <li
            className={`flex items-center gap-3 cursor-pointer p-3 rounded-lg transition-all duration-200 ${
              isActive("/ClientDashboard/AddNewSubject")
                ? "bg-green-500 text-white"
                : "hover:bg-gray-800 text-gray-300 hover:text-green-500"
            }`}
          >
            <PlusIcon className="w-5 h-5" />
            {isOpen && <span className="font-medium">Add New Subject</span>}
          </li>
        </Link>

        {/* View Subjects Dropdown */}
        <li>
          <div
            className={`flex items-center justify-between cursor-pointer p-3 rounded-lg transition-all duration-200 ${
              location.pathname.includes("/subject/")
                ? "bg-green-500 text-white"
                : "hover:bg-gray-800 text-gray-300 hover:text-green-500"
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="flex items-center gap-3">
              {location.pathname.includes("/subject/") ? (
                <BookOpenIconSolid className="w-5 h-5" />
              ) : (
                <BookOpenIcon className="w-5 h-5" />
              )}
              {isOpen && <span className="font-medium">View Subjects</span>}
            </span>
            {isOpen &&
              (isDropdownOpen ? (
                <ChevronUpIcon className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-gray-400" />
              ))}
          </div>

          {isDropdownOpen && isOpen && (
            <ul className="mt-2 space-y-1 pl-2 border-l-2 border-gray-800 ml-3">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => {
                  const subjectPath = `/ClientDashboard/subject/${subject.ct_id}/${encodeURIComponent(subject.subject_name)}`;
                  const isSubjectActive = isActive(subjectPath);
                  return (
                    <Link to={subjectPath} key={subject.ct_id}>
                      <li
                        className={`cursor-pointer p-2.5 rounded-lg transition-all duration-200 ${
                          isSubjectActive
                            ? "bg-green-500 text-white"
                            : "hover:bg-gray-800 text-gray-400 hover:text-green-400"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${
                              isSubjectActive ? "bg-white" : "bg-gray-600"
                            }`}
                          />
                          <span className="text-sm truncate">
                            {subject.subject_name}
                          </span>
                        </div>
                      </li>
                    </Link>
                  );
                })
              ) : (
                <li className="p-2 text-gray-500 text-sm italic">
                  {searchQuery ? "No subjects found" : "No subjects available"}
                </li>
              )}
            </ul>
          )}
        </li>
      </ul>

      {/* Profile Section */}
      {isOpen && (
        <div className="mt-auto mb-4 p-3 bg-gray-900 rounded-lg border border-gray-800">
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 p-2 rounded-full">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white truncate">{client_name}</p>
              <p className="text-xs text-gray-400">Client</p>
            </div>
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div className="mb-2">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 cursor-pointer p-3 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-red-500 transition-all duration-200 border border-gray-800"
        >
          <ArrowLeftOnRectangleIcon className="w-5 h-5" />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default ClientSideNavbar;
