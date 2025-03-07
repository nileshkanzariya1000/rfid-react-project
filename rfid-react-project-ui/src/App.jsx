import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLogin from "./ClientPanal/components/clientLogin"
import ClientRegister from "./ClientPanal/components/clientRegister"
import HomePage from "./PublicPanal/components/home"
import Login from "./UserPanal/components/userLogin"
import Register from "./UserPanal/components/userRegister"
import AdminLogin from "./AdminPanal/components/adminLogin";
import UserDashboard from "./UserPanal/components/userDashboard";
import UserEditProfile from "./UserPanal/components/userEditProfile";
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
        <Route path="/UserEditProfile" element={<UserEditProfile />} />
      </Routes>
    </Router>
  )
}

export default App
