import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";
// user
import USignIn from "./pages/auth/User/signin";
import UForget from "./pages/auth/User/forget";
import UVerification from "./pages/auth/User/Verification";
import UVerify from "./pages/auth/User/verify";
// superAdmin

import Forget from "./pages/auth/SuperAdmin/forget";
// Organisation
import OrgDashboard from "./pages/organisation/dashboard/dashboard";
import SignIn from "./pages/auth/Organisation/SignIn";
import Login from "./pages/auth/Organisation/login";
import Mainpage from "./pages/organisation/dashPages/mainpage";
import Settings from "./pages/organisation/dashPages/Settings";
import Users from "./pages/organisation/dashPages/users";
import AddUsers from "./pages/organisation/dashPages/addUser";
import EditUsers from "./pages/organisation/dashPages/editUser";
import UserRole from "./pages/organisation/dashPages/userRoles";
import UserPermission from "./pages/organisation/dashPages/userPermissions";
import OrgForget from "./pages/auth/Organisation/forget";
import OrgVerify from "./pages/auth/Organisation/verfication";

const App = () => {
  return (
    <>
      <Routes>
        {/* Specific routes first */}
        <Route path="/orglogin" element={<Login />} />
        <Route path="/orgRegister" element={<SignIn />} />
        <Route path="/orgForget" element={<OrgForget />} />
        <Route path="/orgVerify" element={<OrgVerify />} />
        <Route path="/Sforget" element={<Forget />} />
        <Route path="/SVerify" element={<OrgVerify />} />

        {/* Dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <OrgDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Mainpage />} />
          <Route path="main" element={<Mainpage />} />
          <Route path="setting" element={<Settings />} />
          <Route path="users" element={<Users />} />
          <Route path="addUsers" element={<AddUsers />} />
          <Route path="editUsers" element={<EditUsers />} />
          <Route path="userRole" element={<UserRole />} />
          <Route path="userPermission" element={<UserPermission />} />
        </Route>
 
        {/* User routes */}
        <Route path="/Uverification" element={<UVerification />} />
        <Route path="/UVerify" element={<UVerify />} />
        <Route path="/UForget" element={<UForget />} />

        {/* Default route */}
        <Route path="/" element={<USignIn />}>
          <Route index element={<USignIn />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
