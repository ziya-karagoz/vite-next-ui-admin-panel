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
import { getDirectoryPath } from "../helpers/methods";
import toast from "react-hot-toast";

function Toolbar() {
  const { addDirectory, uploadFile, getFiles, files, selectedDirectory } =
    useFiles();
  const {
    isOpen: directoryModalOpen,
    onOpenChange: onDirectoryModalOpenChange,
    onOpen: onDirectoryModalOpen,
  } = useDisclosure();
  const [directoryName, setDirectoryName] = React.useState<string>("");
  const uploadInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center justify-between gap-2 w-full bg-default-50 rounded-lg py-1 px-2 ">
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
                          addDirectory(
                            getDirectoryPath(files, selectedDirectory) +
                            "/" +
                            directoryName
                          ).then(() => {
                            toast.success("Directory created successfully");
                            getFiles && getFiles();
                            onClose();
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
              className="group"
              onPress={() => {
                if (uploadInputRef.current) {
                  uploadInputRef.current.click();
                }
              }}
            >
              <Icon
                icon="tdesign:file-add"
                width="1.2rem"
                height="1.2rem"
                className="group-hover:animate-wiggle"
              />
              Upload File
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
      </div>
      {getFiles && (
        <Button
          className="group"
          isIconOnly
          onPress={() => {
            getFiles();
            toast.success("Files refreshed");
          }}
        >
          <Icon
            icon="lucide:refresh-ccw"
            width="1.2rem"
            height="1.2rem"
            className="rotate-180 group-hover:animate-spin"
          />
        </Button>
      )}
    </div>
  );
}

export default Toolbar;
