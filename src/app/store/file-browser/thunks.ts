import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createFolder,
  deleteFile,
  getFiles,
  renameFile,
  uploadFile,
} from "./apis";
import {
  IDevextremeRenameFileReqBody,
  IDevextremeUploadFileReqBody,
  IDevextremeCreateFolderReqBody,
  IDevextremeDeleteFileReqBody,
} from "../../modules/file-manager/models/models.file-browser";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getFilesThunk = createAsyncThunk("files/FilesThunk", async (_) => {
  return await getFiles();
});

export const renameFilesThunk = createAsyncThunk(
  "files/RenameFilesThunk",
  async (requestBody: IDevextremeRenameFileReqBody, _) => {
    return await renameFile(requestBody);
  }
);

export const createFolderThunk = createAsyncThunk(
  "files/createFolderThunk",
  async (requestBody: IDevextremeCreateFolderReqBody, _) => {
    return await createFolder(requestBody);
  }
);

export const uploadFilesThunk = createAsyncThunk(
  "files/UploadFilesThunk",
  async (requestBody: IDevextremeUploadFileReqBody, {rejectWithValue}) => {
    return await uploadFile(requestBody).then(
      (response) => response,
      (error) => {
        return rejectWithValue(error);
      }
    );
  }
);

export const deleteFilesThunk = createAsyncThunk(
  "files/deleteFilesThunk",
  async (requestBody: IDevextremeDeleteFileReqBody, _) => {
    return await deleteFile(requestBody);
  }
);
