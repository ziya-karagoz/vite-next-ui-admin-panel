import Sidebar from "./components/Sidebar";
import Toolbar from "./components/Toolbar";
import { DynamoFileManagerProvider } from "./contexts/DynamoFileManagerContext";
import { DynamoFileData } from "./types/dynamo-file-manager.types";

type Props = {
    files: DynamoFileData[];
    addDirectory?: (folder_path: string) => void;
    uploadFile?: (pathname: string, file: File) => void;
    renameFile?: (oldName: string, newName: string) => void;
    deleteFile?: (fileName: string) => void;
    refreshFiles?: () => void;
};

function DynamoFileManager({
    files,
    addDirectory,
    deleteFile,
    renameFile,
    uploadFile,
    refreshFiles,
}: Readonly<Props>) {
    return (
        <DynamoFileManagerProvider
            values={{
                files,
                addDirectory,
                deleteFile,
                renameFile,
                uploadFile,
                refreshFiles,
            }}
        >
            <Toolbar />
            <div className="">
                <Sidebar />
            </div>
        </DynamoFileManagerProvider>
    );
}

export default DynamoFileManager;
