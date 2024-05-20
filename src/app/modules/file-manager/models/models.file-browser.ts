export interface IDevextremeFile {
  name: string;
  isDirectory: boolean;
  items: IDevextremeFile[];
  size: number;
  url: string;
}

export interface IDevextremeRenameFileReqBody {
  oldName: string;
  newName: string;
}

export interface IDevextremeCreateFolderReqBody {
  folder_path: string;
}

export interface IDevextremeUploadFileReqBody {
  pathname: string;
  file: File;
}

export interface IDevextremeDeleteFileReqBody {
  filename: string;
}
