import React from "react";
import { Outlet } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";
//import PrintIDCard from "./PrintIDCard";
import IDcardDetails from "../IDcardDetails";
import LatestNews from "./LatestNews";
// import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="">
      {/* <Header /> */}
      <div className="flex max-lg:flex-col gap-[1rem]  ">
        <ProfileOverview />
      </div>
      <Outlet />
    </div>
  );
};

export default Dashboard;
