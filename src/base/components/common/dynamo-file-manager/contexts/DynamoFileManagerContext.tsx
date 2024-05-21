// DynamoFileManager.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { DynamoFileData } from "../types/dynamo-file-manager.types";

interface DynamoFileManagerProps {
    selectedDirectory: DynamoFileData;
        setSelectedDirectory: React.Dispatch<React.SetStateAction<DynamoFileData>>;
    files: DynamoFileData[];
    addDirectory?: (folder_path: string) => void;
    uploadFile?: (pathname: string, file: File) => void;
    renameFile?: (oldName: string, newName: string) => void;
    deleteFile?: (fileName: string) => void;
    refreshFiles?: () => void;
}

const DynamoFileManager = createContext<DynamoFileManagerProps | undefined>(
    undefined
);

interface DynamoFileManagerProviderProps {
    children: ReactNode;
    values: {
        selectedDirectory?: DynamoFileData;
        setSelectedDirectory?: React.Dispatch<React.SetStateAction<DynamoFileData>>;
        files: DynamoFileData[];
        addDirectory?: (folder_path: string) => void;
        uploadFile?: (pathname: string, file: File) => void;
        renameFile?: (oldName: string, newName: string) => void;
        deleteFile?: (fileName: string) => void;
        refreshFiles?: () => void;
    };
}

export const DynamoFileManagerProvider: React.FC<
    DynamoFileManagerProviderProps
> = ({ children, values }) => {
    const [selectedDirectory, setSelectedDirectory] = React.useState<DynamoFileData>(values.files[0]);

    const contextValues = React.useMemo(
        () => ({
            selectedDirectory,
            setSelectedDirectory,
            files: values.files,
            addDirectory: values.addDirectory,
            uploadFile: values.uploadFile,
            renameFile: values.renameFile,
            deleteFile: values.deleteFile,
            refreshFiles: values.refreshFiles,
        }),
        [
            selectedDirectory,
            setSelectedDirectory,
            values.files,
            values.addDirectory,
            values.uploadFile,
            values.renameFile,
            values.deleteFile,
            values.refreshFiles,
        ]
    );
    return (
        <DynamoFileManager.Provider value={contextValues}>
            {children}
        </DynamoFileManager.Provider>
    );
};

export const useFiles = () => {
    const context = useContext(DynamoFileManager);
    if (!context) {
        throw new Error("useFiles must be used within a DynamoFileManagerProvider");
    }
    return context;
};
