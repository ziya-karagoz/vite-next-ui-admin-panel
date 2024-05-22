import React from "react";
import { useFiles } from "../contexts/DynamoFileManagerContext";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { formatBytes } from "../helpers/methods";
import { Icon } from "@iconify/react/dist/iconify.js";

function MainContent() {
  const { selectedDirectory } = useFiles();

  return (
    <Table
      aria-label="Example static collection table"
      className="pt-1"
      selectionMode="single"
      selectionBehavior="replace"
    >
      <TableHeader>
        <TableColumn>NAME</TableColumn>
        <TableColumn>FILE SIZE</TableColumn>
      </TableHeader>
      <TableBody items={selectedDirectory.items}>
        {(item) => (
          <TableRow key={item.name}>
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
                  <Icon icon="solar:file-bold" width="1.2rem" height="1.2rem" className="text-default-400"/>
                )}{" "}
                {item.name}
              </div>
            </TableCell>
            <TableCell>
              {item.isDirectory ? null : formatBytes(item.size)}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

export default MainContent;
