export interface DynamoFileData {
    isDirectory: boolean;
    items?: DynamoFileData[];
    name: string;
    size: number;
    url: string;
}