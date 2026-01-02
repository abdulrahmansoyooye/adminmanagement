import React from "react";
import { Outlet } from "react-router-dom";
import ProfileOverview from "./ProfileOverview";
<<<<<<< HEAD
//import PrintIDCard from "./PrintIDCard";
import IDcardDetails from "../IDcardDetails";
import LatestNews from "./LatestNews";
=======

>>>>>>> 96dcf5a9f50d0e6f99c66f310be0c65e4a5ba6c4
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
