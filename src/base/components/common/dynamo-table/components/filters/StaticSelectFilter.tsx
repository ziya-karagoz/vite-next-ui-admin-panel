import React from 'react'
import { EFilterType, IColumn, IFilterChain, ISelectFilter } from '../../types/dynamo-table.types';
import { Button, ButtonGroup, Checkbox, Divider, Tooltip } from '@nextui-org/react';
import { Icon } from '@iconify/react/dist/iconify.js';

type SelectFilterProps = {
  column: IColumn;
  filterChain: IFilterChain;
  setFilterChain: React.Dispatch<React.SetStateAction<IFilterChain>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function StaticSelectFilter({
  column,
  filterChain,
  setFilterChain,
  setIsOpen,
}: Readonly<SelectFilterProps>) {
  const [localFilter, setLocalFilter] = React.useState<ISelectFilter>(
    (filterChain.find(
        (filter) => filter.id === column.key
    ) as ISelectFilter) ?? {
        id: column.key,
        operation: "EQUAL",
        selecteds: [],
        type: EFilterType.SELECT,
    }
);

  return (
    <div className="flex flex-col p-2 gap-4">
    <h4 className="text-small font-bold">{column.label} Filtrele</h4>
    <div className="flex justify-start items-center gap-1">
        <Tooltip
            content={localFilter.operation === "EQUAL" ? "Equal" : "Not Equal"}
        >
            <Button
                isIconOnly
                color="default"
                aria-label="Like"
                onClick={() =>
                    setLocalFilter({
                        ...localFilter,
                        operation:
                            localFilter.operation === "EQUAL" ? "NOT_EQUAL" : "EQUAL",
                    })
                }
            >
                {localFilter.operation === "EQUAL" ? (
                    <Icon icon="tabler:equal" width="1.2rem" height="1.2rem" />
                ) : (
                    <Icon icon="tabler:equal-not" width="1.2rem" height="1.2rem" />
                )}
            </Button>
        </Tooltip>
        
    </div>
    {column?.filterOptions?.map((item) => (
                    <div className="pt-1" key={item.name}>
                        <Checkbox
                            size="sm"
                            isSelected={localFilter.selecteds.includes(item.value)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setLocalFilter({
                                        ...localFilter,
                                        selecteds: [...localFilter.selecteds, item.value],
                                    });
                                } else {
                                    setLocalFilter({
                                        ...localFilter,
                                        selecteds: localFilter.selecteds.filter(
                                            (selected) => selected !== item.value
                                        ),
                                    });
                                }
                            }}
                        >
                            {item.label}
                        </Checkbox>
                    </div>
                ))}
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
                            filter.id === column.key ? localFilter : filter
                        );
                    } else {
                        return [...prev, localFilter];
                    }
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
  )
}

export default StaticSelectFilter