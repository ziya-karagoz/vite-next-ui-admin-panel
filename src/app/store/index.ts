import { configureStore } from "@reduxjs/toolkit";
import fileBrowserSlice from "./file-browser/fileBrowserSlice";

export const store = configureStore({
  reducer: {
    fileBrowser: fileBrowserSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
