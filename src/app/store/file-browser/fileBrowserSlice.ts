import { createSlice } from "@reduxjs/toolkit";
import { getFilesThunk } from "./thunks";
import { FetchStatus } from "@base/enums/api.enum";

export interface FileBrowserState {
  files: any[];
  filesStatus: FetchStatus;
}

const initialState: FileBrowserState = {
  files: [],
  filesStatus: FetchStatus.IDLE,
};

export const fileBrowserSlice = createSlice({
  name: "fileBrowser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFilesThunk.pending, (state) => {
      state.filesStatus = FetchStatus.LOADING;
    });
    builder.addCase(getFilesThunk.fulfilled, (state, action) => {
      state.filesStatus = FetchStatus.SUCCEEDED;
      // @ts-ignore
      state.files = action.payload;
      localStorage.setItem("files", JSON.stringify(action.payload));
    });
    builder.addCase(getFilesThunk.rejected, (state) => {
      state.filesStatus = FetchStatus.FAILED;
    });
  },
});

export const {} = fileBrowserSlice.actions;

export default fileBrowserSlice;
