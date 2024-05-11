import { Icon } from "@iconify/react/dist/iconify.js";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
import { IColumn } from "../types/dynamo-table.types";

type FilterDropdownProps = {
    column: IColumn;
    filterChain: any[];
    setFilterChain: React.Dispatch<React.SetStateAction<any[]>>;
};
const FilterDropdown: React.FC<FilterDropdownProps> = ({ column, filterChain }) => {
    console.log({column, filterChain});
    return (
        <Popover placement="bottom">
            <PopoverTrigger>
                <Icon
                    icon="fluent:filter-24-filled"
                    width="1.2rem"
                    height="1.2rem"
                    className="cursor-pointer"
                />
            </PopoverTrigger>
            <PopoverContent>
                <div className="px-1 py-2">
                    <div className="text-small font-bold">Popover Content</div>
                    <div className="text-tiny">This is the popover content</div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default FilterDropdown;
