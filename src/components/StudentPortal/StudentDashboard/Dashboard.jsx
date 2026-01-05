import React from "react";
import { Outlet } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";
// import Header from "./Header";

const Dashboard = () => {
  return (
  
    <div className="">
      {/* <Header /> */}
      <div className="">
        <ProfileOverview />
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
