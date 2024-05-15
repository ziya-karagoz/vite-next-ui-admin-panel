import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
} from "@nextui-org/react";
import clsx from "clsx";
import React from "react";
import { IColumn, IFilterChain } from "../types/dynamo-table.types";

type SortDropdownProps = {
    column: IColumn;
    filterChain: IFilterChain;
    sort: string | undefined;
    setSort: React.Dispatch<React.SetStateAction<string | undefined>>;
};

function SortDropdown({ column, filterChain, sort, setSort }: Readonly<SortDropdownProps>) {
   
    const sortAscending = () => {
        // Logic to sort ascending
        setSort(`${column.key},asc`);
    };

    const sortDescending = () => {
        // Logic to sort descending
        setSort(`${column.key},desc`);
    };

    const sortDefault = () => {
        // Logic to sort default
        setSort(undefined);
    };


    return (
        column.key === undefined ? (
            <div className="flex justify-center items-center gap-1 cursor-default">
                <span>{column.label}</span>
            </div>
        ) : (
        <Dropdown>
            <DropdownTrigger>
                <div className= {clsx("flex justify-center items-center gap-1", {
                            "text-primary-500": filterChain.some(
                                (filter) => filter.id === column.key
                            ),
                        })}>
                    <span
                        className="cursor-pointer"
                    >
                        {column.label}
                    </span>
                    {sort?.includes(column?.key) ? (
                        sort?.includes(",asc") ? (
                            <Icon icon="bx:sort-a-z" width="1.2rem" height="1.2rem" />
                        ) : (
                            <Icon icon="bx:sort-z-a" width="1.2rem" height="1.2rem" />
                        )
                    ) : null}
                </div>
            </DropdownTrigger>
            <DropdownMenu variant="faded" aria-label="Dropdown menu with description">
                <DropdownItem
                    key="new"
                    startContent={
                        <Icon icon="bx:sort-a-z" width="1.2rem" height="1.2rem" />
                    }
                    onClick={sortAscending}
                >
                    Sort Ascending
                </DropdownItem>
                <DropdownItem
                    key="copy"
                    startContent={
                        <Icon icon="bx:sort-z-a" width="1.2rem" height="1.2rem" />
                    }
                    onClick={sortDescending}
                >
                    Sort Descending
                </DropdownItem>
                <DropdownItem
                    key="edit"
                    startContent={
                        <Icon icon="bxs:sort-alt" width="1.2rem" height="1.2rem" />
                    }
                    onClick={sortDefault}
                >
                    Sort Default
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
        )
    );
}

export default SortDropdown;
