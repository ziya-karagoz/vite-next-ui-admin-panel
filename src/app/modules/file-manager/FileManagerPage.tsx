import { Route, Routes } from "react-router-dom";
import DynamoFileManager from "@base/components/common/dynamo-file-manager/DynamoFileManager";
import { createFolder, deleteFile, fetchFiles, uploadFile } from "./core/api/file-manager.requests";

const FileManagerPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <DynamoFileManager
            addDirectory={(folder_path)=>{
              createFolder({folder_path});
            }}
            uploadFile={(pathname: string, file: File) => {
              uploadFile({pathname, file});
            }}
            fetchFiles={fetchFiles}
            deleteFile={(filename: string) => {
              deleteFile({filename})
            }}
            pickUrl={(url: string) => {
              console.log("pickUrl:", url);
            }}
          />
        }
      ></Route>
    </Routes>
  );
};

export default FileManagerPage;
