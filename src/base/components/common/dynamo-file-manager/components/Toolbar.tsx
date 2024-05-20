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

function Toolbar() {
  const { addDirectory, uploadFile, refreshFiles } = useFiles();
  const { isOpen: directoryModalOpen, onOpenChange: onDirectoryModalOpenChange, onClose, onOpen: onDirectoryModalOpen } = useDisclosure();
  const [directoryName, setDirectoryName] = React.useState<string>("");
  const uploadInputRef = React.useRef<HTMLInputElement>(null);
  return (
    <nav>
      {addDirectory && (
        <React.Fragment>
          <Button onPress={onDirectoryModalOpen}>New Directory</Button>
          <Modal isOpen={directoryModalOpen} onOpenChange={onDirectoryModalOpenChange}>
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
      {
        uploadFile && (
          <React.Fragment>

            <Button onPress={() => {
              if (uploadInputRef.current) {
                uploadInputRef.current.click();
              }
            
            }}>Upload File</Button>
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
        )
      }
      {
        refreshFiles && (
          <Button onPress={refreshFiles}>Refresh</Button>
        )
      }
    </nav>
  );
}

export default Toolbar;
