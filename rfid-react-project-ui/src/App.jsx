import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./PublicPanal/components/home";
import AdminLogin from "./AdminPanal/components/adminLogin";
import UserLogin from "./UserPanal/components/userLogin";
import UserRegister from "./UserPanal/components/userRegister";
import ClientLogin from "./ClientPanal/components/clientLogin";
import ClientRegister from "./ClientPanal/components/clientRegister";
import UserDashboard from "./UserPanal/components/userDashboard";
import UserSideNavbar from "./UserPanal/components/UserSideNavbar";
import UserEditProfile from "./UserPanal/components/userEditProfile";
import UserEditPassword from "./UserPanal/components/UserEditPassword";
import ClientSubject from "./ClientPanal/components/clientSubject";
import ClientDashboard from "./ClientPanal/components/clientDashboard";
import ClientEditProfile from "./ClientPanal/components/clientEditProfile";
import ClientEditPassword from "./ClientPanal/components/clientEditPassword";
import AddNewSubject from "./ClientPanal/components/addNewSubject";
import ProcideToAdd from "./ClientPanal/components/procideToAdd";
import SubjectUserList from "./ClientPanal/components/subjectUserList";
import ViewAttendanceBySubject from "./ClientPanal/components/viewAttendanceBySubject";
import UpdateTokenForClient from "./ClientPanal/components/updateTokenForClient";
import ProcideToUpdate from "./ClientPanal/components/procideToUpdate";
import AdminDashboard from "./AdminPanal/components/adminDashboard";
import ManageClients from "./AdminPanal/components/manageClients";
import ManageUsers from "./AdminPanal/components/manageUsers";
import AdminEditPassword from "./AdminPanal/components/adminEditPassword";
import TokensDetails from "./AdminPanal/components/adminTokensDetails";
import PurchasedTokens from "./AdminPanal/components/PurchasedTokens";
import UserSubject from "./UserPanal/components/userSubject";
import ViewAttendance from "./UserPanal/components/viewAttendance";

// New page imports
import ProductPage from "./PublicPanal/components/product";
import FeaturePage from "./PublicPanal/components/Feature";
import ResourcesPage from "./PublicPanal/components/Resources";
import PricingPage from "./PublicPanal/components/Pricing";
import ContactPage from "./PublicPanal/components/contact";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/UserLogin" element={<UserLogin />} />
        <Route path="/UserRegister" element={<UserRegister />} />
        <Route path="/ClientLogin" element={<ClientLogin />} />
        <Route path="/ClientRegister" element={<ClientRegister />} />


  {/* New public routes */}
        <Route path="/product" element={<ProductPage />} />
        <Route path="/feature" element={<FeaturePage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* User Routes */}
        <Route path="/UserDashboard" element={<UserDashboard />}>
        
          <Route path="UserSideNavbar" element={<UserSideNavbar />} />
          <Route path="UserEditProfile" element={<UserEditProfile />} />
          <Route path="UserEditPassword" element={<UserEditPassword />} />
          <Route path="subject/:subjectId/:subjectName" element={<UserSubject />} >
            <Route path="ViewAttendanceForUser/:ct_id" element={<ViewAttendance />} />
          </Route>
        </Route>

        {/* Client Routes */}
        <Route path="/ClientDashboard" element={<ClientDashboard />}>
          <Route path="ClientEditProfile" element={<ClientEditProfile />} />
          <Route path="ClientEditPassword" element={<ClientEditPassword />} />
          <Route path="AddNewSubject" element={<AddNewSubject />} >
          <Route path="ProcideToAdd/:token_id" element={<ProcideToAdd />} />
          </Route>
          <Route path="subject/:subjectId/:subjectName" element={<ClientSubject />}>
            <Route path="SubjectUserList/:ct_id" element={<SubjectUserList />} />
            <Route path="ViewAttendanceBySubject/:ct_id" element={<ViewAttendanceBySubject />} />
            <Route path="UpdateTokenForClient/:ct_id" element={<UpdateTokenForClient />} >
            <Route path="ProcideToUpdate/:token_id" element={<ProcideToUpdate />} />
            </Route>
          </Route>
        </Route>

        {/* Admin Routes */}
        <Route path="/AdminDashboard" element={<AdminDashboard />}>
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