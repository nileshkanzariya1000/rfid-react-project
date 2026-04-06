import React from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { Users, ChevronRight } from "lucide-react";

/**
 * Breadcrumb Component
 * Displays: [Icon] [Role] > [Current Page Name] /
 */
const Breadcrumb = () => {
  const location = useLocation();
  const clientData = Cookies.get("client_data")
    ? JSON.parse(Cookies.get("client_data"))
    : {};
  const clientRole = clientData.client_role || "CLIENT";

  const getPageTitle = (pathname) => {
    if (pathname === "/ClientDashboard" || pathname === "/ClientDashboard/") {
      return "Dashboard";
    }
    if (pathname.includes("/ClientEditProfile")) return "Edit Profile";
    if (pathname.includes("/ClientEditPassword")) return "Change Password";
    if (pathname.includes("/ClientLeaveRequests")) return "Manage Leaves";
    if (pathname.includes("/ProcideToAdd")) return "Proceed To Add";
    if (pathname.includes("/AddNewSubject")) return "Add New Subject";
    if (pathname.includes("/SubjectUserList")) return "Subject User List";
    if (pathname.includes("/ViewAttendanceBySubject")) return "View Attendance";
    if (pathname.includes("/UpdateTokenForClient")) return "Update Token";
    if (pathname.includes("/ProcideToUpdate")) return "Proceed To Update";

    const subjectMatch = pathname.match(/\/subject\/[^/]+\/([^/]+)/);
    if (subjectMatch && subjectMatch[1]) {
      return decodeURIComponent(subjectMatch[1]);
    }

    return "Dashboard";
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div className="flex items-center text-sm font-semibold text-gray-400 mb-6">
      <Users className="w-4 h-4 mr-1.5 text-green-500" />
      <span className="text-green-600 uppercase tracking-wider">{clientRole}</span>
      <ChevronRight className="w-4 h-4 mx-1" />
      <span className="text-green-600 font-bold">{pageTitle}</span>
      <div className="ml-2 w-0.5 h-4 bg-green-500 skew-x-[-15deg]" />
    </div>
  );
};

export default Breadcrumb;
