import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Button,
    ButtonGroup,
    Checkbox,
    DateRangePicker,
    Divider,
    Input,
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
   




    const renderDateFilter = React.useMemo(() => {
        return (
            <div className="flex flex-col p-2 gap-4">
            <h4 className="text-small font-bold">{column.label} Filtrele</h4>
            <Input type="number" label="Minimum" size="sm" />
            <Input type="number" label="Maximum" size="sm" />
            <Divider />
            <ButtonGroup className="justify-start">
                <Button size="sm" color="primary" className="w-full">
                    Apply
                </Button>
                <Button size="sm" className="w-full">
                    Clear
                </Button>
            </ButtonGroup>
        </div>
            
        );
    }, []);

   

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
                            return <DateFilter column={column} filterChain={filterChain} setFilterChain={setFilterChain}  isOpen={isOpen} setIsOpen={setIsOpen}/>;
                            case EFilterType.NUMBER:
                            return renderDateFilter;
                        default:
                            return null;
                    }
                }}
            </PopoverContent>
        </Popover>
    );
};

export default FilterDropdown;
