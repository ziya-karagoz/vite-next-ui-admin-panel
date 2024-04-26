import { Route, Routes } from "react-router";
import Dashboard from "./dashboard/Dashboard";

const DashboardPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>

            <Dashboard />
          </>
        }
      ></Route>
    </Routes>
  );
};

export default DashboardPage;
