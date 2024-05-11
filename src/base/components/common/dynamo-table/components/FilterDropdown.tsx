import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Button,
    ButtonGroup,
    DateRangePicker,
    Divider,
    Input,
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@nextui-org/react";
import { EFilterType, IColumn } from "../types/dynamo-table.types";
import React from "react";
import { useDebounce } from "@uidotdev/usehooks";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchColumnFilter } from "../requests/dynamo.requests";

type FilterDropdownProps = {
    column: IColumn;
    filterPath: string;
    filterChain: any[];
    setFilterChain: React.Dispatch<React.SetStateAction<any[]>>;
};
const FilterDropdown: React.FC<FilterDropdownProps> = ({
    column,
    filterChain,
    filterPath,
}) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [hasMore, setHasMore] = React.useState(true);
    const [skip, setSkip] = React.useState(1);
    const [take, setTake] = React.useState(20);

    const [search, setSearch] = React.useState("");
    const debouncedSearch = useDebounce(search, 300);
    const [itemResponse, setItemResponse] = React.useState<{
        data: { key: any }[];
        totalCount: number;
    }>({
        data: [],
        totalCount: 0,
    });

    React.useEffect(() => {
        console.log("ITEM RESPONSE", itemResponse);
    }, [itemResponse]);

    React.useEffect(() => {
        if (column.filterType === EFilterType.SELECT && isOpen) {
            if (itemResponse.data.length === 0) {
                setHasMore(true);
                fetchColumnFilter({
                    path: filterPath,
                    skip,
                    take,
                    group: JSON.stringify([
                        {
                            selector: String(column.key),
                            search: debouncedSearch,
                        },
                    ]),
                }).then((response: any) => {
                    setItemResponse({
                        data: response.data,
                        totalCount: response.totalCount,
                    });
                });
            } else {
                setSkip(1);
                setHasMore(false);
                setItemResponse({
                    data: [],
                    totalCount: 0,
                });
            }
        }
    }, [isOpen]);

    function fetchMoreData() {
        if (itemResponse.data.length >= itemResponse.totalCount) {
            setHasMore(false);
            return;
        } else {
            setSkip(skip + 1);
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
            }).then((response: any) => {
                setItemResponse({
                    data: [...itemResponse.data, ...response.data],
                    totalCount: response.totalCount,
                });
                if (itemResponse.data.length >= itemResponse.totalCount) {
                    setHasMore(false);
                }
            });
        }
    }

    function refreshData() {
        setSkip(1);
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
        }).then((response: any) => {
            setItemResponse({
                data: response.data,
                totalCount: response.totalCount,
            });
        });
    }

    const renderSelectFilter = React.useMemo(() => {
        return (
            <div className="flex flex-col p-2 gap-4">
                <h4 className="text-small font-bold">{column.label} Filtrele</h4>
                <Input
                    className="max-w-xs"
                    type="text"
                    isClearable
                    placeholder="you@example.com"
                    startContent={
                        <Icon icon="uil:search" width="1.2rem" height="1.2rem" />
                    }
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onClear={() => setSearch("")}
                />
                <InfiniteScroll
                    dataLength={itemResponse.data.length} //This is important field to render the next data
                    next={fetchMoreData}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: "center" }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                    // below props only if you need pull down functionality
                    refreshFunction={refreshData}
                    pullDownToRefresh
                    pullDownToRefreshThreshold={50}
                    pullDownToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>
                            &#8595; Pull down to refresh
                        </h3>
                    }
                    releaseToRefreshContent={
                        <h3 style={{ textAlign: "center" }}>&#8593; Release to refresh</h3>
                    }
                >
                    {itemResponse.data.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <input type="checkbox" />
                            <span>{item.key}</span>
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        );
    }, []);

    const renderDateFilter = React.useMemo(() => {
        return (
            <div className="flex flex-col p-2 gap-4">
                <h4 className="text-small font-bold">{column.label} Filtrele</h4>
                <DateRangePicker label="Aralık Seçin" visibleMonths={2} />
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

    const renderNumberFilter = React.useMemo(() => {
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
                if (column.filterType === EFilterType.SELECT) {
                }
            }}
        >
            <PopoverTrigger>
                <Icon
                    icon="fluent:filter-24-filled"
                    width="1.2rem"
                    height="1.2rem"
                    className="cursor-pointer"
                />
            </PopoverTrigger>
            <PopoverContent>
                {() => {
                    switch (column.filterType) {
                        case EFilterType.SELECT:
                            return renderSelectFilter;
                        case EFilterType.DATE:
                            return renderDateFilter;
                        case EFilterType.NUMBER:
                            return renderNumberFilter;
                        default:
                            return null;
                    }
                }}
            </PopoverContent>
        </Popover>
    );
};

export default FilterDropdown;
