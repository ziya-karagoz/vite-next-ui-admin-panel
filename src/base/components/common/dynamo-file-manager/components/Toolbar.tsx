import React from "react";
import { useFiles } from "../contexts/DynamoFileManagerContext";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { findParentDirectory, getDirectoryPath } from "../helpers/methods";
import toast from "react-hot-toast";

function Toolbar() {
  const {
    addDirectory,
    uploadFile,
    getFiles,
    renameFile,
    files,
    selectedDirectory,
    config,
  } = useFiles();
  const {
    isOpen: directoryModalOpen,
    onOpenChange: onDirectoryModalOpenChange,
    onOpen: onDirectoryModalOpen,
  } = useDisclosure();
  const [directoryName, setDirectoryName] = React.useState<string>("");
  const uploadInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={config?.toolbar?.className}>
      <div className={config?.toolbar?.actionsClassName}>
        {addDirectory && (
          <React.Fragment>
            <Button
              isIconOnly={!!config?.toolbar?.newDirectoryButton?.icon && !config.toolbar.newDirectoryButton.title}
              className={config?.toolbar?.newDirectoryButton?.className}
              onPress={onDirectoryModalOpen}
            >
              {config?.toolbar?.newDirectoryButton?.icon}
              {config?.toolbar?.newDirectoryButton?.title ?? "New Directory"}
            </Button>
            <Modal
              isOpen={directoryModalOpen}
              onOpenChange={onDirectoryModalOpenChange}
            >
              <ModalContent>
                {(onClose) => (
                  <>
                    <ModalHeader className="flex flex-col gap-1">
                      New Directory
                    </ModalHeader>
                    <ModalBody>
                      <Input
                        type="text"
                        label="Directory Name"
                        value={directoryName}
                        onChange={(e) => setDirectoryName(e.target.value)}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button variant="solid" onPress={onClose}>
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        onPress={() => {
                          addDirectory(
                            getDirectoryPath(files, selectedDirectory) +
                            "/" +
                            directoryName
                          ).then(() => {
                            toast.success("Directory created successfully");
                            getFiles && getFiles();
                            onClose();
                            setDirectoryName("");
                          });
                        }}
                      >
                        Create
                      </Button>
                    </ModalFooter>
                  </>
                )}
              </ModalContent>
            </Modal>
          </React.Fragment>
        )}
        {uploadFile && (
          <React.Fragment>
            <Button
              className={config?.toolbar?.uploadfileButton?.className}
              onPress={() => {
                if (uploadInputRef.current) {
                  uploadInputRef.current.click();
                }
              }}
            >
              {config?.toolbar?.uploadfileButton?.icon}
              {config?.toolbar?.uploadfileButton?.title ?? "Upload File"}
            </Button>
            <input
              type="file"
              className="hidden"
              ref={uploadInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  uploadFile(
                    getDirectoryPath(files, selectedDirectory),
                    file
                  ).then(() => {
                    toast.success("File uploaded successfully");
                    getFiles && getFiles();
                  });
                }
              }}
            />
          </React.Fragment>
        )}
        {renameFile && (
          <Button
            className={config?.toolbar?.renameButton?.className}
            isIconOnly={!!config?.toolbar?.renameButton?.icon && !config.toolbar.renameButton.title}
            onPress={() => {
              const newName = prompt("Enter new name");
              if (newName) {
                let parentDirectory = findParentDirectory(files, selectedDirectory);
                if(parentDirectory === null) return;
                let parentDirectoryPath = getDirectoryPath(files, parentDirectory);
                renameFile(`${parentDirectoryPath}/${selectedDirectory.name}`, `${parentDirectoryPath}/${newName}`).then(() => {
                  toast.success("File renamed successfully");
                  getFiles && getFiles();
                });
              }
            }}
          >
            {config?.toolbar?.renameButton?.icon}
            {config?.toolbar?.renameButton?.title ?? "Rename"}
          </Button>
        )}
      </div>
      {getFiles && (
        <Button
          className={config?.toolbar?.refreshButton?.className}
          isIconOnly={!!config?.toolbar?.refreshButton?.icon && !config.toolbar.refreshButton.title}
          onPress={() => {
            getFiles();
            toast.success("Files refreshed");
          }}
        >
          {config?.toolbar?.refreshButton?.icon}
          {config?.toolbar?.refreshButton?.title ?? "Refresh"}
        </Button>
      )}
    </div>
  );
}

export default Toolbar;
