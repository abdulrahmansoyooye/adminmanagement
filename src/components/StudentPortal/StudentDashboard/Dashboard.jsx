import React from "react";
import { Outlet } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";

import IDcardDetails from "../IDcardDetails";
import LatestNews from "./LatestNews";




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
