import { DynamoFileData } from "../types/dynamo-file-manager.types";

export const hasDirectories = (items: DynamoFileData[]) => {
    return items.some(item => item.isDirectory);
  };