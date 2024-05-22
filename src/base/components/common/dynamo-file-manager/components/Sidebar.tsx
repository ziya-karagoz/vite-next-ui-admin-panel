import React from "react";

import { useFiles } from "../contexts/DynamoFileManagerContext";
import { DynamoFileData } from "../types/dynamo-file-manager.types";
import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { hasDirectories } from "../helpers/methods";
import { Icon } from "@iconify/react/dist/iconify.js";
import clsx from "clsx";

function Sidebar() {
  const { files, setSelectedDirectory, selectedDirectory } = useFiles();

  const renderDirectories = (
    directories: DynamoFileData[],
    level: number = 0
  ) => {
    const [selectedKeys, setSelectedKeys] = React.useState<Set<string>>(new Set(directories.map((directory) => directory.name)));
    return directories
      .filter((directory) => directory.isDirectory)
      .map((directory) => (
        <div
          key={directory.name}
          style={{ marginLeft: level * 10 }}
          className="flex justify-start gap-2"
        >
          {directory.items && hasDirectories(directory.items) ? (
            <Accordion
              selectedKeys={selectedKeys}
              itemClasses={{
                base: "py-0 w-full px-0",
                title: "font-normal text-medium px-0",
                trigger:clsx("px-0 py-0 hover:bg-default-200 rounded-lg h-14 flex items-center h-8",{
                  "bg-default-200": selectedDirectory.name === directory.name,
                }),
                indicator: "text-medium px-0",
                content: "text-small px-2",
                heading: "text-medium px-0",
                startContent: "text-medium px-0",
                subtitle: "text-small px-0",
                titleWrapper: "px-0",
              }}
            >
              <AccordionItem
                key={directory.name}
                title={directory.name}
                indicator={<div className="hidden"></div>}
                onPress={() => setSelectedDirectory(directory)}
                startContent={
                  <div className="flex justify-center items-center gap-4">
                    <Icon
                      icon="mingcute:down-fill"
                      width="1.2rem"
                      height="1.2rem"
                      onClick={() => {
                        setSelectedKeys(
                          selectedKeys.has(directory.name)
                            ? new Set(
                                Array.from(selectedKeys).filter(
                                  (key) => key !== directory.name
                                )
                              )
                            : new Set([...Array.from(selectedKeys), directory.name])
                        );
                      }
                      }
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
              className={clsx("px-1 mx-2 bg-default-50 hover:bg-default-200 rounded-lg  h-8 flex items-center w-full justify-start", {
                "bg-default-200": selectedDirectory.name === directory.name,
              
              })}
              key={directory.name}
              onClick={() => setSelectedDirectory(directory)}
            >
              <div className="flex justify-start gap-1">
              <div className="flex justify-center items-center gap-4 ">
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
                  </div><span className="text-medium">{directory.name}</span>
              </div>
            </Button>
          )}
        </div>
      ));
  };

  return (
    <div className="min-w-72 bg-default-50 rounded-lg py-4 min-h-80">
      <div>{renderDirectories(files)}</div>
    </div>
  );
}

export default Sidebar;
