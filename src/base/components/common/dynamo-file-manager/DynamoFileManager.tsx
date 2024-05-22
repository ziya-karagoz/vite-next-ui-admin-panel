import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import {
    DynamoFileManagerProvider,
    useFiles,
} from "./contexts/DynamoFileManagerContext";
import { DynamoFileData, DynamoFileManagerConfig } from "./types/dynamo-file-manager.types";
import MainContent from "./components/MainContent";
import { FetchStatus } from "@base/enums/api.enum";
import React from "react";

type Props = {
    addDirectory?: (folder_path: string) => Promise<void>;
    uploadFile?: (pathname: string, file: File) => Promise<void>;
    renameFile?: (oldName: string, newName: string) => Promise<void>;
    deleteFile?: (filename: string) => Promise<void>;
    fetchFiles: () => Promise<DynamoFileData[]>;
    pickUrl?: (url: string) => void;
    title?: string;
    config?: DynamoFileManagerConfig;
};

function WrappedDynamoFileManager() {
    const { filesFetchStatus, title, selectedDirectory, config } = useFiles();
    return (
        <Card classNames={config?.card?.itemClasses}>
            {filesFetchStatus !== FetchStatus.SUCCEEDED || !Object.keys(selectedDirectory).length  ? (
                config?.loader
            ) : (
                <React.Fragment>
                    <CardHeader className="flex flex-col justify-start items-start gap-2 pb-2">
                        {title && <h2 className="text-xl font-bold px-1">{title}</h2>}
                        <Toolbar />
                    </CardHeader>
                    <CardBody className="flex flex-col lg:flex-row justify-between gap-2 pt-0">
                        <Sidebar />
                        <MainContent />
                    </CardBody>
                </React.Fragment>
            )}
        </Card>
    );
}

function DynamoFileManager({
    addDirectory,
    deleteFile,
    renameFile,
    uploadFile,
    fetchFiles,
    pickUrl,
    title,
    config,
}: Readonly<Props>) {
    return (
        <DynamoFileManagerProvider
            values={{
                addDirectory,
                deleteFile,
                renameFile,
                uploadFile,
                fetchFiles,
                pickUrl,
                title,
                config,
            }}
        >
            <WrappedDynamoFileManager />
        </DynamoFileManagerProvider>
    );
}

export default DynamoFileManager;
