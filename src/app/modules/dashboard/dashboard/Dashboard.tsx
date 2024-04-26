import React from "react";
import DashboardCard from "./partials/DashboardCard";

const Dashboard = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
