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
    addDirectory?: (folder_path: string) => void;
    uploadFile?: (pathname: string, file: File) => void;
    renameFile?: (oldName: string, newName: string) => void;
    deleteFile?: (filename: string) => void;
    fetchFiles: () => Promise<DynamoFileData[]>;
    pickUrl?: (url: string) => void;
};

function WrappedDynamoFileManager() {
    const { filesFetchStatus } = useFiles();
    return (
        <Card>
            {filesFetchStatus !== FetchStatus.SUCCEEDED  ? (
                <Loader />
            ) : (
                <React.Fragment>
                    <CardHeader className="flex justify-between gap-2">
                        <Toolbar />
                    </CardHeader>
                    <CardBody className="flex flex-row justify-between gap-2 pt-0">
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
            }}
        >
            <WrappedDynamoFileManager />
        </DynamoFileManagerProvider>
    );
}

export default DynamoFileManager;
