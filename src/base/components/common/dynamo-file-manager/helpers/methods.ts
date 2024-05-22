import { DynamoFileData } from "../types/dynamo-file-manager.types";

export const hasDirectories = (items: DynamoFileData[]) => {
  return items.some((item) => item.isDirectory);
};

export function findDirectory(
  files: DynamoFileData[],
  directory: DynamoFileData
): DynamoFileData | null {
  for (const file of files) {
      if (file.isDirectory) {
          if (file.name === directory.name) {
              return file;
          }
          if (file.items) {
              const found = findDirectory(file.items, directory);
              if (found) {
                  return found;
              }
          }
      }
  }
  return null;
}

export function findDirectoryByFileName(
  files: DynamoFileData[],
  filename: string
): DynamoFileData | null {
  for (const file of files) {
      if (file.name === filename) {
          return file;
      }
      if (file.isDirectory && file.items) {
          const found = findDirectoryByFileName(file.items, filename);
          if (found) {
              return found;
          }
      }
  }
  return null;
}


export function findParentDirectory(
  files: DynamoFileData[],
  directory: DynamoFileData
): DynamoFileData | null {
  // Helper function to recursively search for the parent directory
  function search(
    items: DynamoFileData[],
    target: DynamoFileData
  ): DynamoFileData | null {
    for (let item of items) {
      if (item.isDirectory && item.items) {
        if (item.items.some((child) => child === target)) {
          return item;
        }
        const result = search(item.items, target);
        if (result) {
          return result;
        }
      }
    }
    return null;
  }

  return search(files, directory);
}

// For example, konutkonfor/users/assets
export function getDirectoryPath(files: DynamoFileData[], directory: DynamoFileData): string {
  
  const parent = findParentDirectory(files, directory);
  if(!parent) return directory.name;
  return `${getDirectoryPath(files, parent)}/${directory.name}`;
}

export function getFileType(filename: string | undefined): string {
  if (!filename) return "";
  // Split the file name by dots
  const parts = filename.split(".");
  // Return the last part, which is the file extension
  return (parts.length > 1 ? parts[parts.length - 1] : "").toLowerCase();
}

export function getIconForFile(filename: string | undefined): string {
  const fileType = getFileType(filename);
  switch (fileType) {
    case "svg":
      return "teenyicons:svg-outline";
    case "pdf":
      return "teenyicons:pdf-outline";
    case "doc":
    case "docx":
      return "tabler:file-type-docx";
    case "xls":
    case "xlsx":
      return "tabler:file-type-xls";
    case "ppt":
    case "pptx":
      return "fa6-solid:file-powerpoint";
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
    case "webp":
      return "mage:image";
    case "mp3":
    case "wav":
    case "flac":
      return "lets-icons:sound-fill";
    case "mp4":
    case "avi":
    case "mov":
    case "webm":
      return "uil:video";
    case "zip":
    case "rar":
    case "tar":
    case "7z":
      return "solar:zip-file-broken";
    default:
      return "mage:image";
  }
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;

  const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let unitIndex = 0;

  while (bytes >= 1024 && unitIndex < units.length - 1) {
    bytes /= 1024;
    unitIndex++;
  }

  return `${bytes.toFixed(2)} ${units[unitIndex]}`;
}

export function deepMerge<T extends object>(target: T, source: Partial<T>): T {
  const output = { ...target };
  for (const key in source) {
    if (source[key] instanceof Object && key in target) {
      output[key] = deepMerge((target as any)[key], (source as any)[key]);
    } else {
      (output as any)[key] = source[key];
    }
  }
  return output;
}