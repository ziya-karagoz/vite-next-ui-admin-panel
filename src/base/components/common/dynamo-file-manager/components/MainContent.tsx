import React from "react";
import { useFiles } from "../contexts/DynamoFileManagerContext";
import {
  BreadcrumbItem,
  Breadcrumbs,
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
    renameFile,
    getFiles,
    config,
  } = useFiles();
  const [selectedRow, setSelectedRow] = React.useState<DynamoFileData>();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const uploadInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className={config?.mainContent?.className}>
      <div className={config?.mainContent?.wrapper?.className}>
        <Button
          variant="light"
          isIconOnly={
            !!config?.mainContent?.button?.icon &&
            !config.mainContent.button.title
          }
          onPress={() => {
            let parent = findParentDirectory(files, selectedDirectory);
            if (parent) setSelectedDirectory(parent);
          }}
        >
          {config?.mainContent?.button?.icon}
          {config?.mainContent?.button?.title}
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
        classNames={config?.mainContent?.table?.classNames}
        selectionMode="single"
        selectionBehavior="replace"
      >
        <TableHeader>
          <TableColumn>
            {config?.mainContent?.table?.colNames?.name}
          </TableColumn>
          <TableColumn>
            {config?.mainContent?.table?.colNames?.type}
          </TableColumn>
          <TableColumn>
            {config?.mainContent?.table?.colNames?.size}
          </TableColumn>
          <TableColumn>
            {config?.mainContent?.table?.colNames?.actions}
          </TableColumn>
        </TableHeader>

        <TableBody
          items={selectedDirectory.items}
          emptyContent={
            config?.mainContent?.table?.emptyContent ?? (
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
                    const parent = findParentDirectory(
                      files,
                      selectedDirectory
                    );
                    if (parent) setSelectedDirectory(parent);
                  }}
                >
                  <Icon icon="lets-icons:up" width="1.2rem" height="1.2rem" />{" "}
                  View Parent Directory
                </Button>
              </div>
            )
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
                {renameFile && (
                  <Button
                    color="warning"
                    variant="light"
                    isIconOnly
                    className="group"
                    onPress={() => {
                      alert("Rename file logic goes here");
                    }}
                  >
                    <Icon
                      icon="octicon:pencil-16"
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size={config?.mainContent?.table?.modal?.size}
        classNames={config?.mainContent?.table?.modal?.classNames}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                {selectedRow?.name}{" "}
                <Icon icon={getIconForFile(selectedRow?.name)} width="1.2rem" />
              </ModalHeader>
              <ModalBody>
                <Image
                  isBlurred={
                    config?.mainContent?.table?.modal?.image?.isBlurred
                  }
                  width={config?.mainContent?.table?.modal?.image?.width}
                  src={selectedRow?.url}
                  alt={selectedRow?.name}
                />
                <span className="text-medium">
                  {formatBytes(selectedRow?.size ?? 0)}
                </span>
              </ModalBody>
              <ModalFooter>
                {config?.mainContent?.table?.modal?.actionButtons?.cancel && (
                  <Button
                    className={
                      config?.mainContent?.table?.modal?.actionButtons?.cancel
                        ?.className
                    }
                    color="danger"
                    variant="light"
                    onPress={onClose}
                  >
                    {
                      config?.mainContent?.table?.modal?.actionButtons?.cancel
                        ?.title
                    }
                  </Button>
                )}
                {config?.mainContent?.table?.modal?.actionButtons?.pick && (
                  <Button
                    className={
                      config?.mainContent?.table?.modal?.actionButtons?.pick
                        ?.className
                    }
                    color="primary"
                    onPress={() => {
                      if (pickUrl && selectedRow?.url)
                        pickUrl(selectedRow?.url);
                      onClose();
                    }}
                  >
                    {
                      config?.mainContent?.table?.modal?.actionButtons?.pick
                        ?.title
                    }
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}

export default MainContent;
