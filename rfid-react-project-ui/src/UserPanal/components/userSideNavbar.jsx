import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Bars3Icon,
  XMarkIcon,
  PencilSquareIcon,
  KeyIcon,
  BookOpenIcon,
  ArrowLeftOnRectangleIcon,
  UserIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  HomeIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3Icon as Bars3IconSolid,
  PencilSquareIcon as PencilSquareIconSolid,
  KeyIcon as KeyIconSolid,
  BookOpenIcon as BookOpenIconSolid,
  HomeIcon as HomeIconSolid,
  CalendarDaysIcon as CalendarDaysIconSolid,
} from "@heroicons/react/24/solid";
import { getUserSubjects } from "../service/api"; // Import the API call

const UserSideNavbar = ({ isOpen, setIsOpen }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const { user_name } = JSON.parse(Cookies.get("user_data") || "{}");
  if (!user_name) throw new Error("User not logged in");

  // Filter subjects based on search query
  const filteredSubjects = subjects.filter((subject) =>
    subject.subject_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const subjectData = await getUserSubjects(); // Fetch user subjects
        setSubjects(subjectData.data || []);
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

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  return (
    <div className={`h-screen bg-black text-white ${isOpen ? "w-72 p-4" : "w-20 p-2"} flex flex-col transition-all duration-300 fixed top-0 left-0 z-50 shadow-2xl`}>      
      
      {/* Title Row */}
      <div className={`flex items-center ${isOpen ? "justify-between mb-6 pb-4 border-b border-gray-800" : "justify-center mb-8"}`}>
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="bg-gray-800 p-2 rounded-lg">
              <BookOpenIconSolid className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">
              User Panel
            </h1>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 ${isOpen ? "ml-auto" : ""}`}
        >
          {isOpen ? (
            <XMarkIcon className="w-8 h-8 text-white animate-in spin-in-90 duration-300" />
          ) : (
            <Bars3Icon className="w-8 h-8 text-white animate-in fade-in duration-300" />
          )}
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
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 border border-gray-800 transition-all font-medium text-sm" 
            />
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="p-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer group">
              <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 group-hover:text-green-500" />
            </div>
          </div>
        )}
      </div>

      {/* Menu Items */}
      <ul className="space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        
        <Link to="/UserDashboard">
          <li className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"} ${
            location.pathname === "/UserDashboard"
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "hover:bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {location.pathname === "/UserDashboard" ? (
              <HomeIconSolid className="w-6 h-6" />
            ) : (
              <HomeIcon className="w-6 h-6" />
            )}
            {isOpen && <span className="font-semibold text-sm">Dashboard</span>}
          </li>
        </Link>

        <Link to="/UserDashboard/UserEditProfile">
          <li className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"} ${
            isActive("/UserDashboard/UserEditProfile")
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "hover:bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {isActive("/UserDashboard/UserEditProfile") ? (
              <PencilSquareIconSolid className="w-6 h-6" />
            ) : (
              <PencilSquareIcon className="w-6 h-6" />
            )}
            {isOpen && <span className="font-semibold text-sm">Edit Profile</span>}
          </li>
        </Link>

        <Link to="/UserDashboard/UserEditPassword">
          <li className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"} ${
            isActive("/UserDashboard/UserEditPassword")
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "hover:bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {isActive("/UserDashboard/UserEditPassword") ? (
              <KeyIconSolid className="w-6 h-6" />
            ) : (
              <KeyIcon className="w-6 h-6" />
            )}
            {isOpen && <span className="font-semibold text-sm">Security</span>}
          </li>
        </Link>

        <Link to="/UserDashboard/UserLeave">
          <li className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"} ${
            isActive("/UserDashboard/UserLeave")
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "hover:bg-gray-800 text-gray-400 hover:text-white"
          }`}>
             {isActive("/UserDashboard/UserLeave") ? (
              <CalendarDaysIconSolid className="w-6 h-6" />
            ) : (
              <CalendarDaysIcon className="w-6 h-6" />
            )}
            {isOpen && <span className="font-semibold text-sm">Leave Request</span>}
          </li>
        </Link>

        {/* Subjects Dropdown */}
        <li className="space-y-2">
          <div 
            className={`flex items-center justify-between cursor-pointer p-3 rounded-xl transition-all duration-200 ${
              location.pathname.includes("/subject/")
                ? "bg-green-500/10 text-green-500"
                : "hover:bg-gray-800 text-gray-400 hover:text-white"
            }`} 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className={`flex items-center ${isOpen ? "gap-4" : "justify-center flex-1"}`}>
              <BookOpenIcon className={`w-6 h-6 ${location.pathname.includes("/subject/") ? "text-green-500" : ""}`} />
              {isOpen && <span className="font-semibold text-sm">View Subjects</span>}
            </div>
            {isOpen && (
              isDropdownOpen ? (
                <ChevronUpIcon className="w-4 h-4" />
              ) : (
                <ChevronDownIcon className="w-4 h-4" />
              )
            )}
          </div>
          
          {isDropdownOpen && isOpen && (
            <ul className="space-y-1 ml-4 border-l border-gray-800 animate-in slide-in-from-left-2 duration-300">
              {filteredSubjects.length > 0 ? (
                filteredSubjects.map((subject) => {
                  const subjectPath = `/UserDashboard/subject/${subject.ct_id}/${encodeURIComponent(subject.subject_name)}`;
                  const isSubjectActive = isActive(subjectPath);
                  return (
                    <Link to={subjectPath} key={subject.ct_id}>
                      <li className={`flex items-center gap-3 cursor-pointer p-2.5 ml-3 rounded-lg transition-all duration-200 ${
                        isSubjectActive
                          ? "text-green-500 bg-green-500/5 font-bold"
                          : "text-gray-500 hover:text-gray-300 hover:bg-gray-800/50"
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${isSubjectActive ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-gray-700"}`}></div>
                        <span className="text-xs truncate">{subject.subject_name}</span>
                      </li>
                    </Link>
                  );
                })
              ) : (
                <li className="p-2 ml-3 text-gray-600 text-xs italic">
                  {searchQuery ? "No matches" : "Empty list"}
                </li>
              )}
            </ul>
          )}
        </li>
      </ul>

      {/* Profile Section */}
      {isOpen ? (
        <div className="mt-auto mb-4 p-3 bg-gray-900 rounded-xl border border-gray-800 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 p-2 rounded-full ring-2 ring-gray-700">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white truncate text-sm">{user_name}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">User Panel</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-auto mb-4 flex justify-center">
          <div className="bg-gray-800 p-2 rounded-full ring-2 ring-gray-700 cursor-pointer hover:ring-green-500 transition-all">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      )}

      {/* Logout Button */}
      <div className="mb-2">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center cursor-pointer p-3 rounded-xl bg-gray-900 border border-gray-800 hover:bg-red-500/10 hover:border-red-500/50 hover:text-red-500 text-gray-400 transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"}`}
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          {isOpen && <span className="font-semibold text-sm">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default UserSideNavbar;
