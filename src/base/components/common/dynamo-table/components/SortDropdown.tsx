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
import { generateUrl } from "../helper/helper";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

type SortDropdownProps = {
    column: IColumn;
    filterChain: IFilterChain;
};

function SortDropdown({ column, filterChain }: Readonly<SortDropdownProps>) {

    
    const { pathname } = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    
   
    const sortAscending = () => {
        // Logic to sort ascending
        const updates = {
            sort: `${column.key},asc`,
        };

        const path = generateUrl(pathname, searchParams, updates);
        navigate(path);
    };

    const sortDescending = () => {
        // Logic to sort descending
        const updates = {
            sort: `${column.key},desc`,
        };
        const path = generateUrl(pathname, searchParams, updates);
        navigate(path);
    };

    const sortDefault = () => {
        // Logic to sort default
        const updates = {
            sort: undefined,
        };
        const path = generateUrl(pathname, searchParams, updates);
        navigate(path);
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <div className="flex justify-center items-center gap-1">
                    <span
                        className={clsx("cursor-pointer", {
                            "text-primary-500": filterChain.some(
                                (filter) => filter.id === column.key
                            ),
                        })}
                    >
                        {column.label}
                    </span>
                    {searchParams.get("sort")?.includes(column.key) ? (
                        searchParams.get("sort")?.includes(",asc") ? (
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
                    shortcut="⇧ A"
                    startContent={
                        <Icon icon="bx:sort-a-z" width="1.2rem" height="1.2rem" />
                    }
                    onClick={sortAscending}
                >
                    Sort Ascending
                </DropdownItem>
                <DropdownItem
                    key="copy"
                    shortcut="⇧ D"
                    startContent={
                        <Icon icon="bx:sort-z-a" width="1.2rem" height="1.2rem" />
                    }
                    onClick={sortDescending}
                >
                    Sort Descending
                </DropdownItem>
                <DropdownItem
                    key="edit"
                    shortcut="⇧E"
                    showDivider
                    startContent={
                        <Icon icon="bxs:sort-alt" width="1.2rem" height="1.2rem" />
                    }
                    onClick={sortDefault}
                >
                    Sort Default
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
}

export default SortDropdown;
