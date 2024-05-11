import SuspensedView from "@app/core/components/SuspendedView";
import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  // These components are lazy-loaded, meaning that they will be loaded on demand
  const DashboardPage = React.lazy(
    () => import("@app/modules/dashboard/DashboardPage")
  );
  const AdminPage = React.lazy(() => import("@app/modules/admin/AdminsPage"));

  return (
    <Routes>
      <Route path="auth/*" element={<Navigate to="/" />} />
      <Route
        path="anasayfa/*"
        element={
          <SuspensedView>
            <DashboardPage />
          </SuspensedView>
        }
      />
      <Route
        path="yoneticiler/*"
        element={
          <SuspensedView>
            <AdminPage />
          </SuspensedView>
        }
      />

      {/* Page Not Found */}
      <Route path="*" element={<Navigate to="/error/404" />} />
    </Routes>
  );
};

export { PrivateRoutes };
