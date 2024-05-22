
  export interface IRenameFileReqBody {
    oldName: string;
    newName: string;
  }
  
  export interface ICreateFolderReqBody {
    folder_path: string;
  }
  
  export interface IUploadFileReqBody {
    pathname: string;
    file: File;
  }
  
  export interface IDeleteFileReqBody {
    filename: string;
  }
  