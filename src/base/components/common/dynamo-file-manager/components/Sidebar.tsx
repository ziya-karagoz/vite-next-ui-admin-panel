import React from "react";
import { useFiles } from "../contexts/DynamoFileManagerContext";
import { DynamoFileData } from "../types/dynamo-file-manager.types";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { hasDirectories } from "../helpers/methods";
import { Button } from "devextreme-react";

function Sidebar() {
  const { files, setSelectedDirectory } = useFiles();
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
    indicator: "text-medium",
    content: "text-small px-2",
  };
  const renderDirectories = (
    directories: DynamoFileData[],
    level: number = 0
  ) => {
    return directories
      .filter((directory) => directory.isDirectory)
      .map((directory) => (
        <div key={directory.name} style={{ marginLeft: level * 20 }}>
          {directory.items && hasDirectories(directory.items) ? (
            <Accordion itemClasses={itemClasses}>
              <AccordionItem
                key={directory.name}
                title={directory.name}
                indicator={<div className="hidden"></div>}
              >
                {renderDirectories(directory.items, level + 1)}
              </AccordionItem>
            </Accordion>
          ) : (
            <Button className="px-2 py-0 hover:bg-default-100 rounded-lg h-14 flex items-center"
            key={directory.name}  onClick={() => setSelectedDirectory(directory)}>
            {directory.name}
          </Button>
          )}
        </div>
      ));
  };

  return (
    <div>
      <div>{renderDirectories(files)}</div>
    </div>
  );
}

export default Sidebar;
