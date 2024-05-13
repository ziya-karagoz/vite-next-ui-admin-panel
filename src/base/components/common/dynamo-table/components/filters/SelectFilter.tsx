import { Button, ButtonGroup, Checkbox, Divider, Input } from '@nextui-org/react';
import React from 'react'
import { EFilterType, IColumn, IFilterChain, ISelectFilter } from '../../types/dynamo-table.types';
import { fetchColumnFilter } from '../../requests/dynamo.requests';
import { useDebounce } from '@uidotdev/usehooks';
import { Icon } from '@iconify/react/dist/iconify.js';
import InfiniteScroll from "react-infinite-scroll-component";

type SelectFilterProps = {
    column: IColumn;
    filterChain: IFilterChain;
    filterPath: string;
    isOpen: boolean;
    setFilterChain: React.Dispatch<React.SetStateAction<IFilterChain>>;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SelectFilter({ column, filterChain, setFilterChain, filterPath, isOpen, setIsOpen }: SelectFilterProps) {
    const [localFilter, setLocalFilter] = React.useState<ISelectFilter>(filterChain.find((filter) => filter.id === column.key) as ISelectFilter ?? {
        id: column.key,
        operation: "EQUAL",
        selecteds: [],
        type: EFilterType.SELECT,
    });
    const [saturated, setSaturated] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const debouncedSearch = useDebounce(search, 300);
    const [itemResponse, setItemResponse] = React.useState<{
        data: { key: any }[];
        totalCount: number;
    }>({
        data: [],
        totalCount: 0,
    });
    const [hasMore, setHasMore] = React.useState(true);
    const [skip, setSkip] = React.useState(1);
    const take = 20; // number of items to fetch per request


    React.useEffect(() => {
        if (!isOpen || column.filterType !== EFilterType.SELECT) return;
        if (debouncedSearch || !saturated) {
            fetchColumnFilter({
                path: filterPath,
                skip: 1,
                take,
                group: JSON.stringify([
                    {
                        selector: String(column.key),
                        search: debouncedSearch,
                    },
                ]),
            }).then((response) => {
                setItemResponse({
                    data: response.data,
                    totalCount: response.totalCount,
                });
                setSkip(1);
                setHasMore(
                    response.data.length < response.totalCount &&
                    response.data.length !== 0
                );
                setSaturated(response.data.length >= response.totalCount);
            });
        }
    }, [debouncedSearch, isOpen]);

    function fetchMoreData() {
        if (itemResponse.data.length >= itemResponse.totalCount) {
            setHasMore(false);
            return;
        }
        setSkip((prev) => prev + 1);
        fetchColumnFilter({
            path: filterPath,
            skip: skip + 1,
            take,
            group: JSON.stringify([
                {
                    selector: String(column.key),
                    search: debouncedSearch,
                },
            ]),
        }).then((response) => {
            setItemResponse((prevItemResponse) => ({
                data: [...prevItemResponse.data, ...response.data],
                totalCount: response.totalCount,
            }));
            setHasMore(
                itemResponse.data.length + response.data.length < response.totalCount &&
                response.data.length !== 0
            );
            setSaturated(
                itemResponse.data.length + response.data.length >= response.totalCount
            );
        });
    }

    return (
        <div className="flex flex-col p-2 gap-4">
            <h4 className="text-small font-bold">{column.label} Filtrele</h4>
            <div className="flex justify-center items-center gap-1">
                <Button
                    isIconOnly
                    color="default"
                    aria-label="Like"
                    onClick={() =>
                        setLocalFilter({
                            ...localFilter,
                            operation: localFilter.operation === "EQUAL" ? "NOT_EQUAL" : "EQUAL",
                        })
                    }
                >
                    {localFilter.operation === "EQUAL" ? (
                        <Icon icon="tabler:equal" width="1.2rem" height="1.2rem" />
                    ) : (
                        <Icon icon="tabler:equal-not" width="1.2rem" height="1.2rem" />
                    )}
                </Button>
                <Input
                    className="max-w-xs"
                    type="text"
                    isClearable
                    placeholder="Search..."
                    startContent={
                        <Icon icon="uil:search" width="1.2rem" height="1.2rem" />
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => setSearch("")}
                />
            </div>
            <InfiniteScroll
                dataLength={itemResponse.data.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p>No more items</p>}
                height={200}
            >
                {itemResponse.data.map((item) => (
                    <div className="pt-1" key={item.key}>
                        <Checkbox
                            size="sm"
                            isSelected={localFilter.selecteds.includes(item.key)}
                            onChange={(e) => {
                                if (e.target.checked) {
                                    setLocalFilter({
                                        ...localFilter,
                                        selecteds: [...localFilter.selecteds, item.key],
                                    });
                                } else {
                                    setLocalFilter({
                                        ...localFilter,
                                        selecteds: localFilter.selecteds.filter(
                                            (selected) => selected !== item.key
                                        ),
                                    });
                                }
                            }}
                        >
                            {item.key}
                        </Checkbox>
                    </div>
                ))}
            </InfiniteScroll>
            <Divider />
            <ButtonGroup className="justify-start">
                <Button size="sm" color="primary" className="w-full" onClick={
                    () => {
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
                    }
                
                }>
                    Apply
                </Button>
                <Button size="sm" className="w-full" onClick={() => {
                    setFilterChain((prev) => prev.filter((filter) => filter.id !== column.key));
                    setIsOpen(false);
                }}>
                    Clear
                </Button>
            </ButtonGroup>
        </div>
    );
}

export default SelectFilter