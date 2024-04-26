import {
  IDevextremeCreateFolderReqBody,
  IDevextremeDeleteFileReqBody,
  IDevextremeRenameFileReqBody,
  IDevextremeUploadFileReqBody,
} from "@app/modules/file-manager/models/models.file-browser";
import api from "@base/helpers/enhencers/Interceptor";

const baseUrl = import.meta.env.VITE_API_URL;

export function getFiles() {
  return new Promise((resolve, reject) => {
    api
      .get(`${baseUrl}/api/backoffice/file-maneger/list/object`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function renameFile(requestBody: IDevextremeRenameFileReqBody) {
  return new Promise((resolve, reject) => {
    api
      .post(`${baseUrl}/api/backoffice/file-maneger/rename/object`, requestBody)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function createFolder(requestBody: IDevextremeCreateFolderReqBody) {
  return new Promise((resolve, reject) => {
    api
      .post(`${baseUrl}/api/backoffice/file-maneger/create/folder`, requestBody)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function uploadFile(requestBody: IDevextremeUploadFileReqBody) {
  const formData = new FormData();
  formData.append("file", requestBody.file);
  return new Promise((resolve, reject) => {
    api
      .post(
        `${baseUrl}/api/backoffice/file-maneger/upload?pathname=${requestBody.pathname}`,
        formData
      )
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function deleteFile(requestBody: IDevextremeDeleteFileReqBody) {
  return new Promise((resolve, reject) => {
    api
      .post(`${baseUrl}/api/backoffice/file-maneger/delete/object`, requestBody)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
