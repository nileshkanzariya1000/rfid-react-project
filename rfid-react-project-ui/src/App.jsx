import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLogin from "./ClientPanal/components/clientLogin"
import ClientRegister from "./ClientPanal/components/clientRegister"
import HomePage from "./PublicPanal/components/home"
import Login from "./UserPanal/components/userLogin"
import Register from "./UserPanal/components/userRegister"
import AdminLogin from "./AdminPanal/components/adminLogin";
import UserDashboard from "./UserPanal/components/userDashboard";
import UserSideNavbar from "./UserPanal/components/userSideNavbar";
import UserEditProfile from "./UserPanal/components/userEditProfile";
import UserEditPassword from "./UserPanal/components/UserEditPassword"; 
import ClientDashboard from "./ClientPanal/components/clientDashboard";
import ClientSideNavbar from "./ClientPanal/components/clientSideNavbar";
import ClientEditProfile from "./ClientPanal/components/clientEditProfile";


function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ClientLogin" element={<ClientLogin />} />
        <Route path="/ClientRegister" element={<ClientRegister />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/UserSideNavbar" element={<UserSideNavbar />} />
        <Route path="/UserEditProfile" element={<UserEditProfile />} />
        <Route path="/UserEditPassword" element={<UserEditPassword />} />
        <Route path="/ClientDashboard" element={<ClientDashboard />} />
        <Route path="/ClientSideNavbar" element={<ClientSideNavbar />} />
        <Route path="/ClientEditProfile" element={<ClientEditProfile />} />
        

      
      </Routes>
    </Router>
  )
}

export default App
