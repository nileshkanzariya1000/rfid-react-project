import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import AdminSideNavbar from './adminSideNavbar';  // Correct import

const AdminDashboard = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const adminData = Cookies.get('admin_data');
    if (!adminData) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSideNavbar />  {/* Use the correct component */}
      
      {/* Main content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-semibold mb-6">Welcome to Admin Dashboard</h1>

      </div>
    </div>
  );
};

export default AdminDashboard;
