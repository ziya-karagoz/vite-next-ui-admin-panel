import {
    Button,
    ButtonGroup,
    DateRangePicker,
    DateValue,
    Divider,
    RangeValue,
} from "@nextui-org/react";
import React from "react";
import {
    EFilterType,
    IColumn,
    IDateFilter,
    IFilterChain,
} from "../../types/dynamo-table.types";
import { parseDate } from "@internationalized/date";

type DateFilterProps = {
    column: IColumn;
    filterChain: IFilterChain;
    isOpen: boolean;
    setFilterChain: React.Dispatch<React.SetStateAction<IFilterChain>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function DateFilter({
    column,
    filterChain,
    setFilterChain,
    isOpen,
    setIsOpen,
}: Readonly<DateFilterProps>) {

    const [localFilter, setLocalFilter] = React.useState<IDateFilter>(
        (filterChain.find((filter) => filter.id === column.key) as IDateFilter) ?? {
            id: column.key,
            min:null,
            max: null,
            type: EFilterType.DATE,
        }
    );



    return (
        <div className="flex flex-col p-2 gap-4">
            <h4 className="text-small font-bold">{column.label} Filtrele</h4>
            <DateRangePicker
                label="Date range"
                value= {{
                    start: localFilter.min ? parseDate(localFilter.min) as unknown : undefined,
                    end: localFilter.max ? parseDate(localFilter.max) as unknown : undefined,
                } as RangeValue<DateValue>}
                visibleMonths={2}
                onChange={(value) => {
                    setLocalFilter((prev) => ({
                        ...prev,
                        min: value.start ? value.start.toString() : null,
                        max: value.end ? value.end.toString() : null,
                    } as IDateFilter));
                }}
            />
            <Divider />
            <ButtonGroup className="justify-start">
                <Button
                    size="sm"
                    color="primary"
                    className="w-full"
                    onClick={() => {
                        setFilterChain((prev) => {
                            if (prev.some((filter) => filter.id === column.key)) {
                                return prev.map((filter) =>
                                    filter.id === column.key ? {
                                        id: column.key,
                                        min: localFilter.min,
                                        max: localFilter.max,
                                        type: EFilterType.DATE,
                                      } as IDateFilter : filter
                                );
                            } else return [...prev, localFilter];
                        });
                        setIsOpen(false);
                    }}
                >
                    Apply
                </Button>
                <Button
                    size="sm"
                    className="w-full"
                    onClick={() => {
                        setFilterChain((prev) =>
                            prev.filter((filter) => filter.id !== column.key)
                        );
                        setIsOpen(false);
                    }}
                >
                    Clear
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default DateFilter;
