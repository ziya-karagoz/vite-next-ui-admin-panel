import React from "react";
import { useFiles } from "../contexts/DynamoFileManagerContext";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Divider,
  Image,
  Kbd,
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
  findDirectoryByFileName,
  findParentDirectory,
  formatBytes,
  getDirectoryPath,
  getFileType,
  getIconForFile,
} from "../helpers/methods";
import { Icon } from "@iconify/react/dist/iconify.js";
import { DynamoFileData } from "../types/dynamo-file-manager.types";
import { swal } from "../../swal/SwalAlert";
import toast from "react-hot-toast";

function MainContent() {
  const {
    selectedDirectory,
    files,
    setSelectedDirectory,
    pickUrl,
    uploadFile,
    deleteFile,
    getFiles,
  } = useFiles();
  const [selectedRow, setSelectedRow] = React.useState<DynamoFileData>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const uploadInputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <div className="w-full">
      <div className="flex justify-start items-center gap-1 pb-2">
        <Button
          variant="light"
          isIconOnly
          onPress={() => {
            let parent = findParentDirectory(files, selectedDirectory);
            if (parent) setSelectedDirectory(parent);
          }}
        >
          <Icon icon="mingcute:up-fill" width="1.2rem" height="1.2rem" />
        </Button>
        <Breadcrumbs variant="solid">
          {getDirectoryPath(files, selectedDirectory)
            .split("/")
            .map((path) => {
              let directory = findDirectoryByFileName(files, path);
              return (
                <BreadcrumbItem
                  key={path}
                  onPress={() => {
                    if (directory) {
                      setSelectedDirectory(directory);
                    }
                  }}
                >
                  {path}
                </BreadcrumbItem>
              );
            })}
        </Breadcrumbs>
      </div>
      <Table
        aria-label="Example static collection table"
        classNames={{
          base: "h-96 ",
          wrapper:
            "h-96 bg-default-50 border-0 shadow-none  rounded-lg overflow-y-auto fancy-scrollbar",
        }}
        selectionMode="single"
        selectionBehavior="replace"
      >
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>FILE TYPE</TableColumn>
          <TableColumn>FILE SIZE</TableColumn>
          <TableColumn> </TableColumn>
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
                        uploadFile(
                          getDirectoryPath(files, selectedDirectory),
                          file
                        );
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
              <TableCell>
                {deleteFile && (
                  <Button
                    color="danger"
                    variant="light"
                    isIconOnly
                    className="group"
                    onPress={() => {
                      swal
                        .fire({
                          title: "Are you sure?",
                          text: "You will not be able to recover this file!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonText: "Yes, delete it!",
                          cancelButtonText: "No, cancel!",
                        })
                        .then((result) => {
                          if (result.isConfirmed) {
                            deleteFile(
                              getDirectoryPath(files, selectedDirectory) +
                              "/" +
                              item.name
                            ).then(() => {
                              toast.success("File deleted successfully");
                              getFiles && getFiles();
                            });
                          }
                        });
                    }}
                  >
                    <Icon
                      icon="octicon:trash-16"
                      className="group-hover:animate-wiggle"
                      width="1.2rem"
                      height="1.2rem"
                    />
                  </Button>
                )}
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
    </div>
  );
}

export default MainContent;
