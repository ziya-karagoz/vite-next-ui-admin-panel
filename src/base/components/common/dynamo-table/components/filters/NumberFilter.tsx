import { Button, ButtonGroup, Divider, Input } from "@nextui-org/react";
import React from "react";
import {
    EFilterType,
    IColumn,
    IFilterChain,
    INumberFilter,
} from "../../types/dynamo-table.types";
type NumberFilterProps = {
    column: IColumn;
    filterChain: IFilterChain;
    setFilterChain: React.Dispatch<React.SetStateAction<IFilterChain>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function NumberFilter({
    column,
    filterChain,
    setFilterChain,
    setIsOpen,
}: Readonly<NumberFilterProps>) {
    const [localFilter, setLocalFilter] = React.useState<INumberFilter>(
        (filterChain.find(
            (filter) => filter.id === column.key
        ) as INumberFilter) ?? {
            id: column.key,
            min: undefined,
            max: undefined,
            type: EFilterType.NUMBER,
        }
    );

    return (
        <div className="flex flex-col p-2 gap-4">
            <h4 className="text-small font-bold">{column.label} Filtrele</h4>
            <Input
                type="number"
                label="Minimum"
                size="sm"
                startContent={column.filterConfig?.numberFilterAdornment}
                value={localFilter.min?.toString() ?? ""}
                onChange={(e) => {
                    setLocalFilter(
                        (prev) =>
                        ({
                            ...prev,
                            min: Number(e.target.value),
                        } as INumberFilter)
                    );
                }}
            />
            <Input
                type="number"
                label="Maximum"
                size="sm"
                startContent={column.filterConfig?.numberFilterAdornment}
                value={localFilter.max?.toString() ?? ""}
                onChange={(e) => {
                    setLocalFilter(
                        (prev) =>
                        ({
                            ...prev,
                            max: Number(e.target.value),
                        } as INumberFilter)
                    );
                }}
            />
            <Divider />
            <ButtonGroup className="justify-start">
                <Button
                    size="sm"
                    color="primary"
                    className="w-full"
                    onClick={() => {
                        setFilterChain((prev) => [
                            ...prev.filter((filter) => filter.id !== column.key),
                            localFilter,
                        ]);
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

export default NumberFilter;
