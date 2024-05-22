import React from "react";
import { useFiles } from "../contexts/DynamoFileManagerContext";
import { DynamoFileData } from "../types/dynamo-file-manager.types";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { hasDirectories } from "../helpers/methods";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";

function Sidebar() {
  const { files, setSelectedDirectory, selectedDirectory } = useFiles();
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set());

  React.useEffect(() => {
    // Mevcut selectedKeys durumunu koruyarak güncelle
    const newKeys = new Set(selectedKeys);
    files.forEach((file) => {
      if (file.isDirectory && !newKeys.has(file.name)) {
        newKeys.add(file.name);
      }
    });
    setSelectedKeys(newKeys);
  }, [files]);

  const handleDirectoryClick = (directory: DynamoFileData) => {
    setSelectedDirectory(directory);
  };

  const handleIconClick = (directoryName: string) => {
    const newSelectedKeys = new Set(selectedKeys);
    if (newSelectedKeys.has(directoryName)) {
      newSelectedKeys.delete(directoryName);
    } else {
      newSelectedKeys.add(directoryName);
    }
    setSelectedKeys(newSelectedKeys);
  };

  const renderDirectories = (
    directories: DynamoFileData[],
    level: number = 0
  ) => {
    return directories
      .filter((directory) => directory.isDirectory)
      .map((directory) => (
        <div
          key={directory.name}
          style={{ marginLeft: level + 10 }}
          className="flex justify-start gap-2"
        >
          {directory.items && hasDirectories(directory.items) ? (
            <Accordion
              className="px-0 w-full"
              selectedKeys={selectedKeys}
              itemClasses={{
                base: "py-0 w-full px-0",
                title: "font-normal text-medium px-0 w-full",
                trigger: clsx("px-0 py-0 hover:bg-default-200 rounded-lg h-14 flex items-center h-8 w-full", {
                  "bg-default-200": selectedDirectory.name === directory.name,
                }),
                indicator: "invisible",
                content: "text-small px-0",
                heading: "text-medium px-0",
                startContent: "text-medium px-0",
                subtitle: "text-small px-0",
                titleWrapper: "px-0",
              }}
            >
              <AccordionItem
                key={directory.name}
                title={directory.name}
                onPress={() => handleDirectoryClick(directory)}
                startContent={
                  <div className="flex justify-center items-center gap-4">
                    <Icon
                      icon="mingcute:down-fill"
                      width="1.2rem"
                      height="1.2rem"
                      onClick={() => handleIconClick(directory.name)}
                      className={clsx("transition-transform duration-300", {
                        "-rotate-90": !selectedKeys.has(directory.name),
                        "rotate-0": selectedKeys.has(directory.name),
                      })}
                    />
                    <Icon
                      icon="solar:folder-bold"
                      width="1.2rem"
                      height="1.2rem"
                      className="text-yellow-500"
                    />
                  </div>
                }
              >
                {renderDirectories(directory.items, level + 1)}
              </AccordionItem>
            </Accordion>
          ) : (
            <Button
              className={clsx("px-0 bg-default-50 hover:bg-default-200 rounded-lg h-8 flex items-center w-full justify-start", {
                "bg-default-200": selectedDirectory.name === directory.name,
              })}
              key={directory.name}
              onClick={() => handleDirectoryClick(directory)}
            >
              <div className="flex justify-start gap-1">
                <div className="flex justify-center items-center gap-4">
                  <Icon
                    icon="mingcute:down-fill"
                    width="1.2rem"
                    height="1.2rem"
                    className={"invisible"}
                  />
                  <Icon
                    icon="solar:folder-bold"
                    width="1.2rem"
                    height="1.2rem"
                    className="text-yellow-500"
                  />
                </div>
                <span className="text-medium">{directory.name}</span>
              </div>
            </Button>
          )}
        </div>
      ));
  };

  return (
    <div className="min-w-72 bg-default-50 rounded-lg py-4 h-96 overflow-y-auto fancy-scrollbar">
      <div className="px-2">{renderDirectories(files)}</div>
    </div>
  );
}

export default Sidebar;
