import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import PermissionWrapper from "@base/helpers/permissions/PermissionWrapper";
import App from "@app/App";
import { useAuth } from "@app/modules/auth/core/contexts/AuthContext";
import { AuthPage } from "@app/modules/auth/AuthPage";
import { Logout } from "@app/modules/auth/core/components/Logout";
import { PrivateRoutes } from "./PrivateRoutes";

function AppRoutes() {
  const { currentUser } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="error/*" element={<div>Error Page</div>} />
          <Route path="logout" element={<Logout />} />
          {currentUser ? (
            <>
              <Route
                path="/*"
                element={
                  <PermissionWrapper>
                    <PrivateRoutes />
                  </PermissionWrapper>
                }
              />
              <Route index element={<Navigate to="/anasayfa" />} />
            </>
          ) : (
            <>
              <Route path="auth/*" element={<AuthPage />} />
              <Route path="*" element={<Navigate to="/auth" />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
