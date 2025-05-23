import React from "react";
import UpcommingQuizes from "../AdminModules/Quizes/UpcommingQuizes";
import TopFive from "../SharedModules/TopFive/TopFive";

const Dashboard = () => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <div className="col-span-2 lg:col-span-1">
        <UpcommingQuizes />
      </div>
      <div className="col-span-2 lg:col-span-1">
        <TopFive />
      </div>
    </div>
  );
};

export default Dashboard;
