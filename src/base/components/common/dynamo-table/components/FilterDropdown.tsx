import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import {
    EFilterType,
    IColumn,
    IFilterChain,
} from "../types/dynamo-table.types";
import React from "react";
import SelectFilter from "./filters/SelectFilter";
import clsx from "clsx";
import DateFilter from "./filters/DateFilter";
import NumberFilter from "./filters/NumberFilter";
import StaticSelectFilter from "./filters/StaticSelectFilter";

type FilterDropdownProps = {
    column: IColumn;
    filterPath: string;
    filterChain: IFilterChain;
    setFilterChain: React.Dispatch<React.SetStateAction<IFilterChain>>;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    column,
    filterChain,
    filterPath,
    setFilterChain,
}) => {

    const [isOpen, setIsOpen] = React.useState(false);



    return (
        <Popover
            placement="bottom"
            isOpen={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
            }}
        >
            <PopoverTrigger>
                <Icon
                    icon="fluent:filter-24-filled"
                    width="1.2rem"
                    height="1.2rem"
                    className={clsx("cursor-pointer hover:animate-wiggle",{
                        "text-primary-500": filterChain.some((filter) => filter.id === column.key),
                    })}
                />
            </PopoverTrigger>
            <PopoverContent>
                {() => {
                    switch (column.filterType) {
                        case EFilterType.SELECT:
                            return <SelectFilter column={column} filterChain={filterChain} setFilterChain={setFilterChain} filterPath={filterPath} isOpen={isOpen} setIsOpen={setIsOpen}/>;
                        case EFilterType.DATE:
                            return <DateFilter column={column} filterChain={filterChain} setFilterChain={setFilterChain} setIsOpen={setIsOpen}/>;
                            case EFilterType.NUMBER:
                            return <NumberFilter column={column} filterChain={filterChain} setFilterChain={setFilterChain} setIsOpen={setIsOpen}/>;
                        case EFilterType.STATIC_SELECT:
                            return <StaticSelectFilter column={column} filterChain={filterChain} setFilterChain={setFilterChain} setIsOpen={setIsOpen}/>;
                            default:
                            return null;
                    }
                }}
            </PopoverContent>
        </Popover>
    );
};

export default FilterDropdown;
