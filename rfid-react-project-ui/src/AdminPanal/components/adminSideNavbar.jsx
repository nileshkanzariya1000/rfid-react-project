import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Bars3Icon,
  XMarkIcon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  UserIcon,
  KeyIcon,
  CurrencyRupeeIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  Bars3Icon as Bars3IconSolid,
  UserGroupIcon as UserGroupIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  ArrowLeftOnRectangleIcon as ArrowLeftOnRectangleIconSolid,
  KeyIcon as KeyIconSolid,
  CurrencyRupeeIcon as CurrencyRupeeIconSolid,
  HomeIcon as HomeIconSolid,
} from "@heroicons/react/24/solid";

const AdminSideNavbar = ({ isOpen, setIsOpen }) => {
  const adminData = Cookies.get("admin_data");
  if (!adminData) {
    window.location.href = "/";
  }

  const [adminName, setAdminName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    if (adminData) {
      try {
        const parsedData = JSON.parse(adminData);
        setAdminName(parsedData.username || "Admin");
      } catch (error) {
        console.error("Error parsing admin data:", error);
      }
    }
  }, [adminData]);

  const handleLogout = () => {
    Cookies.remove("admin_data");
    window.location.href = "/";
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
              <UserGroupIconSolid className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">
              Admin Panel
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
              placeholder="Search..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 border border-gray-800 transition-all" 
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
        
        <Link to="/AdminDashboard">
          <li className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"} ${
            location.pathname === "/AdminDashboard"
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "hover:bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {location.pathname === "/AdminDashboard" ? (
              <HomeIconSolid className="w-6 h-6" />
            ) : (
              <HomeIcon className="w-6 h-6" />
            )}
            {isOpen && <span className="font-semibold text-sm">Dashboard</span>}
          </li>
        </Link>

        <Link to="AdminEditPassword">
          <li className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"} ${
            isActive("/AdminDashboard/AdminEditPassword")
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "hover:bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {isActive("/AdminDashboard/AdminEditPassword") ? (
              <KeyIconSolid className="w-6 h-6" />
            ) : (
              <KeyIcon className="w-6 h-6" />
            )}
            {isOpen && <span className="font-semibold text-sm">Edit Password</span>}
          </li>
        </Link>

        <Link to="ManageUsers">
          <li className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"} ${
            isActive("/AdminDashboard/ManageUsers")
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "hover:bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {isActive("/AdminDashboard/ManageUsers") ? (
              <UserGroupIconSolid className="w-6 h-6" />
            ) : (
              <UserGroupIcon className="w-6 h-6" />
            )}
            {isOpen && <span className="font-semibold text-sm">Manage Users</span>}
          </li>
        </Link>

        <Link to="ManageClients">
          <li className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"} ${
            isActive("/AdminDashboard/ManageClients")
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "hover:bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {isActive("/AdminDashboard/ManageClients") ? (
              <ClipboardDocumentListIconSolid className="w-6 h-6" />
            ) : (
              <ClipboardDocumentListIcon className="w-6 h-6" />
            )}
            {isOpen && <span className="font-semibold text-sm">Manage Clients</span>}
          </li>
        </Link>

        <Link to="AdminTokensDetails">
          <li className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"} ${
            isActive("/AdminDashboard/AdminTokensDetails")
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "hover:bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {isActive("/AdminDashboard/AdminTokensDetails") ? (
              <CurrencyRupeeIconSolid className="w-6 h-6" />
            ) : (
              <CurrencyRupeeIcon className="w-6 h-6" />
            )}
            {isOpen && <span className="font-semibold text-sm">Tokens</span>}
          </li>
        </Link>

        <Link to="PurchasedTokens">
          <li className={`flex items-center cursor-pointer p-3 rounded-xl transition-all duration-200 ${isOpen ? "gap-4" : "justify-center"} ${
            isActive("/AdminDashboard/PurchasedTokens")
              ? "bg-green-500 text-white shadow-lg shadow-green-500/20"
              : "hover:bg-gray-800 text-gray-400 hover:text-white"
          }`}>
            {isActive("/AdminDashboard/PurchasedTokens") ? (
              <Cog6ToothIconSolid className="w-6 h-6" />
            ) : (
              <Cog6ToothIcon className="w-6 h-6" />
            )}
            {isOpen && <span className="font-semibold text-sm">Purchased Tokens</span>}
          </li>
        </Link>

      </ul>

      {/* Profile Section */}
      {isOpen ? (
        <div className="mt-auto mb-4 p-3 bg-gray-900 rounded-xl border border-gray-800 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="bg-gray-800 p-2 rounded-full ring-2 ring-gray-700">
              <UserIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white truncate text-sm">{adminName || "Admin"}</p>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Administrator</p>
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

export default AdminSideNavbar;
