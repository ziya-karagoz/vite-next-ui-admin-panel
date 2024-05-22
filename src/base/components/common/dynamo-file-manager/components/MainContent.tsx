import React from "react";
import { useFiles } from "../contexts/DynamoFileManagerContext";
import {
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import {
  findParentDirectory,
  formatBytes,
  getDirectoryPath,
  getFileType,
  getIconForFile,
} from "../helpers/methods";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DynamoFileData } from "../types/dynamo-file-manager.types";

function MainContent() {
  const {
    selectedDirectory,
    files,
    setSelectedDirectory,
    pickUrl,
    uploadFile,
  } = useFiles();
  const [selectedRow, setSelectedRow] = React.useState<DynamoFileData>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const uploadInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <React.Fragment>
      <Table
        aria-label="Example static collection table"
        classNames={{
          base: "min-h-80 pt-1",
          wrapper: "min-h-80",
        }}
        selectionMode="single"
        selectionBehavior="replace"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>FILE TYPE</TableColumn>
          <TableColumn>FILE SIZE</TableColumn>
        </TableHeader>

        <TableBody
          items={selectedDirectory.items}
          emptyContent={
            <div className="flex flex-col justify-center items-center gap-4">
              <span className="text-lg text-default-800">No files found</span>
              {uploadFile && (
                <React.Fragment>
                  <Button
                    variant="light"
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
                        uploadFile(getDirectoryPath(files, selectedDirectory), file);
                      }
                    }}
                  />
                </React.Fragment>
              )}
              <div className="flex justify-center items-center gap-2">
                <Divider />
                <span>or</span>
                <Divider />
              </div>
              <Button
                variant="light"
                color="warning"
                onPress={() => {
                  const parent = findParentDirectory(files, selectedDirectory);
                  if (parent) setSelectedDirectory(parent);
                }}
              >
                <Icon icon="lets-icons:up" width="1.2rem" height="1.2rem" /> Go
                Back
              </Button>
            </div>
          }
        >
          {(item) => (
            <TableRow
              key={item.name}
              onDoubleClick={() => {
                if (item.isDirectory) {
                  setSelectedDirectory(item);
                } else {
                  setSelectedRow(item);
                  onOpen();
                }
              }}
            >
              <TableCell>
                {" "}
                <div className="flex justify-start items-center gap-1">
                  {item.isDirectory ? (
                    <Icon
                      icon="solar:folder-bold"
                      width="1.2rem"
                      height="1.2rem"
                      className="text-yellow-500"
                    />
                  ) : (
                    <Icon
                      icon={getIconForFile(item.name)}
                      width="1.2rem"
                      height="1.2rem"
                      className="text-default-400"
                    />
                  )}{" "}
                  {item.name}
                </div>
              </TableCell>
              <TableCell>{getFileType(item.name)}</TableCell>
              <TableCell>
                {item.isDirectory ? null : formatBytes(item.size)}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="full">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row items-center gap-1">
                {selectedRow?.name}{" "}
                <Icon icon={getIconForFile(selectedRow?.name)} width="1.2rem" />
              </ModalHeader>
              <ModalBody>
                <Image
                  isBlurred
                  width={450}
                  src={selectedRow?.url}
                  alt={selectedRow?.name}
                  className="m-5 w-full"
                />
                <span className="text-medium">
                  {formatBytes(selectedRow?.size ?? 0)}
                </span>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (pickUrl && selectedRow?.url) pickUrl(selectedRow?.url);
                    onClose();
                  }}
                >
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </React.Fragment>
  );
}

export default MainContent;
