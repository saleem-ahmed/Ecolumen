import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";

// user
import USignIn from "./pages/auth/User/signin";
import UForget from "./pages/auth/User/forget";
import UVerification from "./pages/auth/User/Verification";
import UVerify from "./pages/auth/User/verify";
import StaffDashboard from "./pages/Staff/dashboard/dashboard";
import Mainpage2 from "./pages/Staff/dashPages/mainpage";
import Reports from "./pages/Staff/dashPages/reports";
import Upload from "./pages/Staff/dashPages/upload";
import CesiumMap from "./pages/organisation/dashPages/cesiumMap";

// superAdmin
import Forget from "./pages/auth/SuperAdmin/forget";

// Organisation
import OrgDashboard from "./pages/organisation/dashboard/dashboard";
import SignIn from "./pages/auth/Organisation/SignIn";
import Login from "./pages/auth/Organisation/login";
import Mainpage from "./pages/organisation/dashPages/mainpage";
import OrgUpload from "./pages/organisation/dashPages/dataUpload";
import OrgReport from "./pages/organisation/dashPages/Reports";
import Users from "./pages/organisation/dashPages/users";
import AddUsers from "./pages/organisation/dashPages/addUser";
import EditUsers from "./pages/organisation/dashPages/editUser";
import UserRole from "./pages/organisation/dashPages/userRoles";
import UserPermission from "./pages/organisation/dashPages/userPermissions";
import OrgForget from "./pages/auth/Organisation/forget";
import OrgVerify from "./pages/auth/Organisation/verfication";
import About from "./pages/organisation/dashPages/about";

const App = () => {

  return (
    <Routes>
      {/* Specific routes first */}
      <Route path="/orglogin" element={<Login />} />
      <Route path="/orgRegister" element={<SignIn />} />
      <Route path="/orgForget" element={<OrgForget />} />
      <Route path="/orgVerify" element={<OrgVerify />} />
      <Route path="/Sforget" element={<Forget />} />
      <Route path="/SVerify" element={<OrgVerify />} />
      {/* <Route path="/Confirmation" element={<Confirmation />} /> */}

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
        <Route path="map-3d" element={<CesiumMap />} />
        <Route path="upload" element={<OrgUpload />} />
        <Route path="users" element={<Users />} />
        <Route path="addUsers" element={<AddUsers />} />
        <Route path="editUsers" element={<EditUsers />} />
        <Route path="userRole" element={<UserRole />} />
        <Route path="userPermission" element={<UserPermission />} />
        <Route path="report" element={<OrgReport />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* staff routes */}
      <Route path="/Uverification" element={<UVerification />} />
      <Route path="/UVerify" element={<UVerify />} />
      <Route path="/UForget" element={<UForget />} />
      <Route path="/staffDashboard" element={<StaffDashboard />}>
        <Route index element={<Mainpage2 />} />
        <Route path="main" element={<Mainpage2 />} />
        <Route path="reports" element={<Reports />} />
        <Route path="map-3d" element={<CesiumMap />} />
        <Route path="Upload" element={<Upload />} />
        <Route path="users" element={<Users />} />
        <Route path="addUsers" element={<AddUsers />} />
        <Route path="editUsers" element={<EditUsers />} />
        <Route path="userRole" element={<UserRole />} />
        <Route path="about" element={<About />} />
      </Route>

      {/* Default route */}
      <Route path="/" element={<USignIn />}>
        <Route index element={<USignIn />} />
      </Route>
    </Routes>
  );
};

export default App;
