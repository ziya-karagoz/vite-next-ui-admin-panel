// DynamoFileManager.tsx
import React, { createContext, useContext, ReactNode } from "react";
import {
    DynamoFileData,
    DynamoFileManagerConfig,
} from "../types/dynamo-file-manager.types";
import { FetchStatus } from "@base/enums/api.enum";
import { deepMerge, findDirectory } from "../helpers/methods";
import { config } from "process";
import { Icon } from "@iconify/react/dist/iconify.js";

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
    config?: DynamoFileManagerConfig;
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
        config?: DynamoFileManagerConfig;
    };
}

// Varsayılan config değerlerini tanımlayın
const defaultConfig: DynamoFileManagerConfig = {
    toolbar: {
        className:
            "flex items-center justify-between gap-2 w-full bg-default-50 rounded-lg py-1 px-2",
        actionsClassName: "flex items-center justify-start gap-2",
    },
    sidebar: {
        button: {
            className:
                "px-0 bg-default-50 hover:bg-default-200 rounded-lg h-8 flex items-center w-full justify-start",
        },
        wrapperClassName:
            "px-2 h-96 min-w-72 bg-default-50 rounded-lg py-4 overflow-y-auto fancy-scrollbar",
        accordion: {
            className: "px-0 w-full",
            itemClasses: {
                base: "py-0 w-full px-0",
                title: "font-normal text-medium px-0 w-full",
                trigger:
                    "px-0 py-0 hover:bg-default-200 rounded-lg h-14 flex items-center h-8 w-full",
                indicator: "invisible",
                content: "text-small px-0",
                heading: "text-medium px-0",
                startContent: "text-medium px-0",
                subtitle: "text-small px-0",
                titleWrapper: "px-0",
            },
        },
        activeDirectoryClassName: "bg-default-200",
    },
    mainContent: {
        className: "w-full",
        wrapper: {
            className: "flex justify-start items-center gap-1 pb-2 h-12",
        },
        button: {
            icon: <Icon icon="mingcute:up-fill" width="1.2rem" height="1.2rem" />,
        },
        table: {
            classNames: {
                base: "h-[calc(24rem-3rem)] ",
                wrapper:
                    "h-[calc(24rem-3rem)] bg-default-50 border-0 shadow-none  rounded-lg overflow-y-auto fancy-scrollbar",
            },
            colNames: {
                name: "NAME",
                type: "FILE TYPE",
                size: "FILE SIZE",
                actions: " ",
            },
            modal: {
                size: "full",
                actionButtons: {
                    cancel: {
                        title: "Cancel"
                    },
                    pick: {
                        title: "Pick Image"
                    }
                },
                classNames:{
                    header: "flex flex-row items-center gap-1",
                  },
                  image: {
                    isBlurred: true,
                    width: 450,
                  }
            }
        },
    },
    
};

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

    React.useEffect(() => { }, [selectedDirectory]);
    function getFiles() {
        values
            .fetchFiles()
            .then((data) => {
                setFilesFetchStatus(FetchStatus.SUCCEEDED);
                setFiles(data);
                // Mevcut selectedDirectory'yi yeni data içinde bul
                const currentSelectedDirectory =
                    findDirectory(data, selectedDirectory) ||
                    data[0] ||
                    ({} as DynamoFileData);
                setSelectedDirectory(currentSelectedDirectory);
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
            config: !values.config
                ? defaultConfig
                : deepMerge(defaultConfig, values.config),
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
            config,
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
