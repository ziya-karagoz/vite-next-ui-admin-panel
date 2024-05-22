
  import { DynamoFileData } from "@base/components/common/dynamo-file-manager/types/dynamo-file-manager.types";
import api from "@base/helpers/enhencers/Interceptor";
import { ICreateFolderReqBody, IDeleteFileReqBody, IRenameFileReqBody, IUploadFileReqBody } from "../models/file-manager.requests";
  
  const API_URL = import.meta.env.VITE_API_URL;
  const PREFIX = "file-maneger";

  
  export function fetchFiles(): Promise<DynamoFileData[]> {
    return api.get(`${API_URL}/api/backoffice/${PREFIX}/list/object`);
  }

  export function renameFile(reqBody:IRenameFileReqBody){
    return api.post(`${API_URL}/api/backoffice/${PREFIX}/rename/object`, reqBody);
  }

  export function createFolder(reqBody: ICreateFolderReqBody){
    return api.post(`${API_URL}/api/backoffice/${PREFIX}/create/folder`, reqBody);
  }

  export function uploadFile(reqBody: IUploadFileReqBody){
    const formData = new FormData();
    formData.append("file", reqBody.file);
    return api.post(`${API_URL}/api/backoffice/${PREFIX}/upload/`, formData, {
        params: {
            pathname: reqBody.pathname,
        }
    });
  }

  export function deleteFile(reqBody: IDeleteFileReqBody){
    return api.post(`${API_URL}/api/backoffice/${PREFIX}/delete/object`, reqBody);
  }