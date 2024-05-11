import { Route, Routes } from "react-router";
import AdminList from "./admin-list/AdminList";
import AddAdmin from "./add-admin/AddAdmin";
import EditAdmin from "./edit-admin/EditAdmin";

const AdminsPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <AdminList />
        }
      />
      <Route
        path="/ekle"
        element={
          <AddAdmin />
        }
      />
      <Route
        path="/duzenle/:id"
        element={
          <EditAdmin />
        }
      />
    </Routes>
  );
};

export default AdminsPage;
