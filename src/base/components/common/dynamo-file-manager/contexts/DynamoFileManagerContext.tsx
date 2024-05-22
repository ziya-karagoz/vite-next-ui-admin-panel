// DynamoFileManager.tsx
import React, { createContext, useContext, ReactNode } from "react";
import { DynamoFileData } from "../types/dynamo-file-manager.types";
import { FetchStatus } from "@base/enums/api.enum";

export interface DynamoFileManagerContextProps {
    selectedDirectory: DynamoFileData;
    files: DynamoFileData[];
    filesFetchStatus: FetchStatus;
    setSelectedDirectory: React.Dispatch<React.SetStateAction<DynamoFileData>>;
    addDirectory?: (folder_path: string) => Promise<void>;
    uploadFile?: (pathname: string, file: File) => Promise<void>;
    renameFile?: (oldName: string, newName: string) => Promise<void>;
    deleteFile?: (filename: string) => Promise<void>;
    fetchFiles: () => Promise<DynamoFileData[]>;
    getFiles?: () => void;
    pickUrl?: (url: string) => void;
    title?: string;
}

const DynamoFileManager = createContext<
    DynamoFileManagerContextProps | undefined
>(undefined);

interface DynamoFileManagerProviderProps {
    children: ReactNode;
    values: {
        selectedDirectory?: DynamoFileData;
        setSelectedDirectory?: React.Dispatch<React.SetStateAction<DynamoFileData>>;
        addDirectory?: (folder_path: string) => Promise<void>;
        uploadFile?: (pathname: string, file: File) => Promise<void>;
        renameFile?: (oldName: string, newName: string) => Promise<void>;
        deleteFile?: (filename: string) => Promise<void>;
        fetchFiles: () => Promise<DynamoFileData[]>;
        getFiles?: () => void;
        pickUrl?: (url: string) => void;
        title?: string;
    };
}

export const DynamoFileManagerProvider: React.FC<
    DynamoFileManagerProviderProps
> = ({ children, values }) => {
    const [files, setFiles] = React.useState<DynamoFileData[]>([]);
    const [selectedDirectory, setSelectedDirectory] =
        React.useState<DynamoFileData>({} as DynamoFileData);
    const [filesFetchStatus, setFilesFetchStatus] = React.useState<FetchStatus>(
        FetchStatus.IDLE
    );

    React.useEffect(() => {
        setFilesFetchStatus(FetchStatus.LOADING);
        getFiles();
    }, [values.fetchFiles]);


    function getFiles() {
        values
            .fetchFiles()
            .then((data) => {
                setFilesFetchStatus(FetchStatus.SUCCEEDED);
                setFiles(data);
                setSelectedDirectory(data[0] || {} as DynamoFileData);
            })
            .catch(() => {
                setFilesFetchStatus(FetchStatus.FAILED);
            });
    }

    const contextValues = React.useMemo(
        () => ({
            selectedDirectory,
            setSelectedDirectory,
            files,
            filesFetchStatus,
            addDirectory: values.addDirectory,
            uploadFile: values.uploadFile,
            renameFile: values.renameFile,
            deleteFile: values.deleteFile,
            fetchFiles: values.fetchFiles,
            getFiles: getFiles,
            pickUrl: values.pickUrl,
            title: values.title,
        }),
        [
            selectedDirectory,
            setSelectedDirectory,
            files,
            filesFetchStatus,
            values.addDirectory,
            values.uploadFile,
            values.renameFile,
            values.deleteFile,
            values.pickUrl,
            values.title,
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
