import { Route, Routes } from "react-router-dom"; 
import FileBrowser from "./file-manager/FileBrowser";

const FileManagerPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <FileBrowser/>
        }
      ></Route>
    </Routes>
  );
};

export default FileManagerPage;
