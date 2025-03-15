import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ClientLogin from "./ClientPanal/components/clientLogin";
import ClientRegister from "./ClientPanal/components/clientRegister";
import HomePage from "./PublicPanal/components/home";
import Login from "./UserPanal/components/userLogin";
import Register from "./UserPanal/components/userRegister";
import AdminLogin from "./AdminPanal/components/adminLogin";
import UserDashboard from "./UserPanal/components/userDashboard";
import UserSideNavbar from "./UserPanal/components/userSideNavbar";
import UserEditProfile from "./UserPanal/components/userEditProfile";
import UserEditPassword from "./UserPanal/components/UserEditPassword"; 
import ClientDashboard from "./ClientPanal/components/clientDashboard";
import ClientEditProfile from "./ClientPanal/components/clientEditProfile";
import ClientEditPassword from "./ClientPanal/components/clientEditPassword";
import ClientSubject from "./ClientPanal/components/clientSubject";
import SubjectUserList from "./ClientPanal/components/subjectUserList";
import AdminDashboard from "./AdminPanal/components/adminDashboard";
import AddNewSubject from "./ClientPanal/components/addNewSubject";
import ProcideToAdd from "./ClientPanal/components/procideToAdd";
import UpdateTokenForClient from "./ClientPanal/components/updateTokenForClient";
import ProcideToUpdate from "./ClientPanal/components/procideToUpdate";
import ViewAttendanceBySubject from "./ClientPanal/components/viewAttendanceBySubject";
import ManageClients from "./AdminPanal/components/manageClients";
import ManageUsers from "./AdminPanal/components/manageUsers";
import AdminEditPassword from "./AdminPanal/components/adminEditPassword";
import TokensDetails from "./AdminPanal/components/adminTokensDetails";
import PurchasedTokens from "./AdminPanal/components/PurchasedTokens";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ClientLogin" element={<ClientLogin />} />
        <Route path="/ClientRegister" element={<ClientRegister />} />
        <Route path="/Register" element={<Register />} />

        {/* User routes */}
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/UserSideNavbar" element={<UserSideNavbar />} />
        <Route path="/UserEditProfile" element={<UserEditProfile />} />
        <Route path="/UserEditPassword" element={<UserEditPassword />} />

        {/* Client routes */}
        <Route path="/ClientDashboard" element={<ClientDashboard />}>
          <Route path="ClientEditProfile" element={<ClientEditProfile />} />
          <Route path="ClientEditPassword" element={<ClientEditPassword />} />
          <Route path="AddNewSubject" element={<AddNewSubject />} >
          <Route path="ProcideToAdd/:token_id" element={<ProcideToAdd />}/>  
          </Route>
          <Route path="subject/:subjectId/:subjectName" element={<ClientSubject />}>
            <Route path="SubjectUserList/:ct_id" element={<SubjectUserList />} />
            <Route path="ViewAttendanceBySubject/:ct_id" element={<ViewAttendanceBySubject />} />
            <Route path="UpdateTokenForClient/:ct_id" element={<UpdateTokenForClient />}>
            <Route path="ProcideToUpdate/:token_id" element={<ProcideToUpdate />}/>
            </Route>
          </Route>
        </Route>

        {/* Admin route (Moved outside of ClientDashboard) */}
        <Route path="/Admindashboard" element={<AdminDashboard />}>
          <Route path="AdminEditPassword" element={<AdminEditPassword />} />
          <Route path="ManageUsers" element={<ManageUsers />} />
          <Route path="ManageClients" element={<ManageClients />} />
          <Route path="AdminTokensDetails" element={<TokensDetails />} />
          <Route path="PurchasedTokens" element={<PurchasedTokens />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
