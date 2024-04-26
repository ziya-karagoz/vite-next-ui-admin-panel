import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function Logout() {
  const { logout } = useAuth();
  useEffect(() => {
    logout({ alert: false });
    document.location.reload();
  }, [logout]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
}
