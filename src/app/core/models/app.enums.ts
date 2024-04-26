export enum FetchStatus {
    IDLE = "idle",
    LOADING = "loading",
    SUCCEEDED = "succeeded",
    FAILED = "failed",
  }
  
  export type FetchListParams = {
    skip?: number | undefined;
    take?: number | undefined;
    sort?: string | undefined;
    filter?: string | undefined;
  };