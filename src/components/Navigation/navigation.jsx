// import React from "react";
import { Routes, Route } from "react-router-dom";
import Mainpage from "../../pages/organisation/dashPages/mainpage";
import Settings from "../../pages/organisation/dashPages/Settings";
import Users from "../../pages/organisation/dashPages/users";
import AddUser from "../../pages/organisation/dashPages/Adduser";
const Navigation = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/setting" element={<Settings />} />
        <Route path="/user" element={<Users />} />
        <Route path="/addUser" element={<AddUser />} />
      </Routes>
    </>
  );
};

export default Navigation;
