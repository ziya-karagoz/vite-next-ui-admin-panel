import { Card, CardBody, CardHeader } from "@nextui-org/react";
import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import {
    DynamoFileManagerProvider,
    useFiles,
} from "./contexts/DynamoFileManagerContext";
import { DynamoFileData } from "./types/dynamo-file-manager.types";
import MainContent from "./components/MainContent";
import { FetchStatus } from "@base/enums/api.enum";
import Loader from "@base/layout/components/loader/Loader";
import React from "react";

type Props = {
    addDirectory?: (folder_path: string) => Promise<void>;
    uploadFile?: (pathname: string, file: File) => Promise<void>;
    renameFile?: (oldName: string, newName: string) => Promise<void>;
    deleteFile?: (filename: string) => Promise<void>;
    fetchFiles: () => Promise<DynamoFileData[]>;
    pickUrl?: (url: string) => void;
    title?: string;
};

function WrappedDynamoFileManager() {
    const { filesFetchStatus, title, selectedDirectory } = useFiles();
    return (
        <Card>
            {filesFetchStatus !== FetchStatus.SUCCEEDED || !Object.keys(selectedDirectory).length  ? (
                <Loader />
            ) : (
                <React.Fragment>
                    <CardHeader className="flex flex-col justify-start items-start gap-2">
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
            }}
        >
            <WrappedDynamoFileManager />
        </DynamoFileManagerProvider>
    );
}

export default DynamoFileManager;
