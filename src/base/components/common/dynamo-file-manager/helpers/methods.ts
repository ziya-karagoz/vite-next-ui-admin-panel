import { DynamoFileData } from "../types/dynamo-file-manager.types";

export const hasDirectories = (items: DynamoFileData[]) => {
  return items.some((item) => item.isDirectory);
};

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
