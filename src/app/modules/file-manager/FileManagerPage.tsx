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
            addDirectory={async (folder_path)=>{
              await createFolder({folder_path});
            }}
            uploadFile={async (pathname: string, file: File) => {
              await uploadFile({pathname, file});
            }}
            fetchFiles={fetchFiles}
            deleteFile={async (filename: string) => {
              await deleteFile({filename})
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
