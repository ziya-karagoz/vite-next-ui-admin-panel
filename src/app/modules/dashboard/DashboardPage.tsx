import { Route, Routes } from "react-router";
import { Home } from "./home/Home";

const DashboardPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home />
        }
      ></Route>
    </Routes>
  );
};

export default DashboardPage;
