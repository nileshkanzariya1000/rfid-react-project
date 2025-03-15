import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import {
  Bars3Icon,
  UserGroupIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  ArrowLeftOnRectangleIcon,
  MagnifyingGlassIcon,
  UserIcon,
  KeyIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/solid";

const AdminSideNavbar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const adminData = Cookies.get("admin_data");
    if (adminData) {
      try {
        const parsedData = JSON.parse(adminData);
        setAdminName(parsedData.username || "Admin");
      } catch (error) {
        console.error("Error parsing admin data:", error);
      }
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("admin_data");
  };

  return (
    <div className={`h-screen bg-black text-white p-4 ${isOpen ? "w-64" : "w-16"} flex flex-col transition-all duration-300`}>
      <div className="flex items-center justify-between mb-4">
        {isOpen && <span className="text-white text-2xl font-bold">Admin</span>}
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded hover:bg-gray-700 ml-auto">
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      <div className="mb-4">
        {isOpen ? (
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 rounded bg-gray-800 text-white focus:outline-none"
          />
        ) : (
          <div className="flex justify-center">
            <MagnifyingGlassIcon className="w-6 h-6" />
          </div>
        )}
      </div>

      <ul className="space-y-3 flex-1">
        <li>
          <Link to="AdminEditPassword"
            className={`flex items-center gap-2 p-2 rounded w-full ${selectedItem === "EditPassword" ? "bg-green-500 text-white" : "hover:text-green-500"}`}
            onClick={() => setSelectedItem("EditPassword")}
          >
            <KeyIcon className="w-6 h-6" />
            {isOpen && <span>Edit Password</span>}
          </Link>
        </li>

        <li>
          <Link to="ManageUsers"
            className={`flex items-center gap-2 p-2 rounded w-full ${selectedItem === "Manage Students" ? "bg-green-500 text-white" : "hover:text-green-500"}`}
            onClick={() => setSelectedItem("Manage Students")}
          >
            <UserGroupIcon className="w-6 h-6" />
            {isOpen && <span>Manage Users</span>}
          </Link>
        </li>

        <li>
          <Link to="ManageClients"
            className={`flex items-center gap-2 p-2 rounded w-full ${selectedItem === "Manage Teacher" ? "bg-green-500 text-white" : "hover:text-green-500"}`}
            onClick={() => setSelectedItem("Manage Teacher")}
          >
            <ClipboardDocumentListIcon className="w-6 h-6" />
            {isOpen && <span>Manage Clients</span>}
          </Link>
        </li>

        <li>
          <Link to="AdminTokensDetails"
            className={`flex items-center gap-2 p-2 rounded w-full ${selectedItem === "Tokens" ? "bg-green-500 text-white" : "hover:text-green-500"}`}
            onClick={() => setSelectedItem("Tokens")}
          >
            <CurrencyRupeeIcon className="w-6 h-6" />
            {isOpen && <span>Tokens</span>}
          </Link>
        </li>

        <li>
          <Link to="PurchasedTokens"
            className={`flex items-center gap-2 p-2 rounded w-full ${selectedItem === "Settings" ? "bg-green-500 text-white" : "hover:text-green-500"}`}
            onClick={() => setSelectedItem("Settings")}
          >
            <Cog6ToothIcon className="w-6 h-6" />
            {isOpen && <span>Purchased Tokens</span>}
          </Link>
        </li>
      </ul>

      <div className="mb-4">
        <Link to="/"
          className={`flex items-center gap-2 w-full p-2 rounded ${selectedItem === "Logout" ? "bg-red-500 text-white" : "hover:text-red-500"}`}
          onClick={() => {
            setSelectedItem("Logout");
            handleLogout();
          }}
        >
          <ArrowLeftOnRectangleIcon className="w-6 h-6" />
          {isOpen && <span>Logout</span>}
        </Link>
      </div>

      {isOpen && (
        <div className="flex items-center bg-gray-800 p-2 rounded-lg mt-2">
          <UserIcon className="w-10 h-10 text-white" />
          <div className="ml-3">
            <p className="font-bold">{adminName || "Admin"}</p>
            <p className="text-sm text-gray-400">Admin</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSideNavbar;
