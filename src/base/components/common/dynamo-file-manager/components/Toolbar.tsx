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
import { Icon } from "@iconify/react/dist/iconify.js";

function Toolbar() {
  const { addDirectory, uploadFile,  getFiles  } = useFiles();
  const {
    isOpen: directoryModalOpen,
    onOpenChange: onDirectoryModalOpenChange,
    onOpen: onDirectoryModalOpen,
  } = useDisclosure();
  const [directoryName, setDirectoryName] = React.useState<string>("");
  const uploadInputRef = React.useRef<HTMLInputElement>(null);
  return (
<div className="flex items-center justify-between gap-2 w-full bg-default-50 rounded-lgpy-1 px-2 ">
        <div className="flex items-center justify-start gap-2">
        {addDirectory && (
          <React.Fragment>
            <Button onPress={onDirectoryModalOpen}>New Directory</Button>
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
                          addDirectory(directoryName);
                          onClose();
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
              onPress={() => {
                if (uploadInputRef.current) {
                  uploadInputRef.current.click();
                }
              }}
            >
              <Icon icon="tdesign:file-add" width="1.2rem" height="1.2rem" />
              Upload File
            </Button>
            <input
              type="file"
              className="hidden"
              ref={uploadInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  uploadFile(file.name, file);
                }
              }}
            />
          </React.Fragment>
        )}
        </div>
        {getFiles && <Button isIconOnly onPress={getFiles}><Icon icon="lucide:refresh-ccw" width="1.2rem" height="1.2rem" /></Button>}
        </div>
      );
}

export default Toolbar;
