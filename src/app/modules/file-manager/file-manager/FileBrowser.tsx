import DynamoFileManager from '@base/components/common/dynamo-file-manager/DynamoFileManager';
import { createFolder, deleteFile, fetchFiles, uploadFile } from '../core/api/file-manager.requests';

function FileBrowser() {
  return (
    <DynamoFileManager
            title='File Manager'
            addDirectory={async (folder_path)=>{
              await createFolder({folder_path});
            }}
            uploadFile={async (pathname: string, file: File) => {
              await uploadFile({pathname, file});
            }}
            fetchFiles={fetchFiles}
            deleteFile={async (filename: string) => {
              await deleteFile({filename})
            }}
            pickUrl={(url: string) => {
              console.log("pickUrl:", url);
            }}
          />
  )
}

export default FileBrowser