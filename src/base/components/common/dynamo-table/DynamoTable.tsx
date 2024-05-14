import {
    Button,
    Input,
    Pagination,
    Select,
    SelectItem,
    Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";
import React from "react";
import { findValueByKey, generateUrl } from "./helper/helper";
import {
    IColumn,
    IFilterChain,
    ISearchFilter,
    TableMeta,
    TableSearchColumn,
} from "./types/dynamo-table.types";
import { FetchStatus } from "@base/enums/api.enum";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { takes } from "./data/data";
import { useDebounce } from "@uidotdev/usehooks";
import { Icon } from "@iconify/react/dist/iconify.js";
import FilterDropdown from "./components/FilterDropdown";
import clsx from "clsx";
import SortDropdown from "./components/SortDropdown";

type DynamoTableProps = {
    title: string;
    columns: IColumn[];
    rows: any[]; // vague type
    loadStatus: FetchStatus;
    meta: TableMeta;
    searchColumns?: TableSearchColumn[];
    filterPath: string;
};

const DynamoTable: React.FC<DynamoTableProps> = ({
    title,
    columns,
    rows,
    loadStatus,
    meta,
    searchColumns = [],
    filterPath,
}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [sort, setSort] = React.useState<string | undefined>(
        columns.find((column) => column.key === searchParams.get("sort"))?.key ?? undefined
    );
    const [filterChain, setFilterChain] = React.useState<IFilterChain>(
        JSON.parse(searchParams.get("filter")!) ?? []
    );
    const [search, setSearch] = React.useState<string>(
        (
            filterChain?.find(
                (filter) => filter?.id === "global_search"
            ) as ISearchFilter
        )?.value ?? ""
    );

    const debouncedSearch = useDebounce(search, 500);

    const handlePageChange = (page: number) => {
        const updates = {
            skip: page.toString(),
        };
        const path = generateUrl(pathname, searchParams, updates);
        navigate(path);
    };

    const bottomContent = React.useMemo(() => {
        function handlePrevious() {
            if (meta.currentPage === 1) return;
            handlePageChange(meta.currentPage - 1);
        }

        function handleNext() {
            if (meta.currentPage === meta.totalPages) return;
            handlePageChange(meta.currentPage + 1);
        }

        function handleTakeChange(event: React.ChangeEvent<HTMLSelectElement>) {
            const updates = {
                take: event.target.value,
                skip: "1",
                sort: searchParams.get("sort") ?? "",
            };
            const path = generateUrl(pathname, searchParams, updates);
            navigate(path);
        }

        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Select
                    aria-label="Select"
                    defaultSelectedKeys={[meta.itemsPerPage.toString()]}
                    className="max-w-20"
                    onChange={handleTakeChange}
                >
                    {takes.map((take) => (
                        <SelectItem key={take.value} value={take.value}>
                            {take.label}
                        </SelectItem>
                    ))}
                </Select>
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={meta.currentPage}
                    total={meta.totalPages}
                    onChange={handlePageChange}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button
                        isDisabled={meta.currentPage === 1}
                        size="sm"
                        variant="flat"
                        onPress={handlePrevious}
                    >
                        Previous
                    </Button>
                    <Button
                        isDisabled={meta.totalPages === meta.currentPage}
                        size="sm"
                        variant="flat"
                        onPress={handleNext}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [meta]);

    React.useEffect(() => {
        const globalSearchFilter = {
            id: "global_search",
            type: "SEARCH",
            value: debouncedSearch,
            columns: searchColumns,
        } as ISearchFilter;
        if (debouncedSearch) {
            if (filterChain.some((filter) => filter.id === "global_search")) {
                setFilterChain((prev) =>
                    prev.map((filter) =>
                        filter.id === "global_search" ? globalSearchFilter : filter
                    )
                );
            } else {
                setFilterChain((prev) => [...prev, globalSearchFilter]);
            }
        } else {
            setFilterChain((prev) =>
                prev.filter((filter) => filter.id !== "global_search")
            );
        }
    }, [debouncedSearch]);

    React.useEffect(() => {
        const updates = {
            filter: JSON.stringify(filterChain),
            sort: sort,
        };
        const path = generateUrl(pathname, searchParams, updates);
        navigate(path);
    }, [filterChain, sort]);

    return (
        <Table
            selectionBehavior="replace"
            aria-label={title}
            bottomContent={bottomContent}
            topContent={
                <div className="flex justify-between items-center gap-4 flex-wrap">
                    <h2 className="text-xl font-bold mb-2">{title}</h2>
                    <div className="flex justify-end items-center gap-1">
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
                        <Tooltip content="Clear All Filters">
                            <Button
                                size="sm"
                                color="default"
                                isIconOnly
                                onClick={() => {
                                    navigate(pathname);
                                }}
                            >
                                <Icon icon="tabler:filter-x" width="1.2rem" height="1.2rem" />
                            </Button>
                        </Tooltip>
                    </div>
                </div>
            }
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.key}>
                        <div className="flex justify-start items-center gap-1">
                            {column.filterType !== undefined ? (
                                <FilterDropdown
                                    filterPath={filterPath}
                                    column={column}
                                    filterChain={filterChain}
                                    setFilterChain={setFilterChain}
                                />
                            ) : null}
                            <SortDropdown column={column} filterChain={filterChain} sort={sort} setSort={setSort}/>
                        </div>
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody
                loadingState={loadStatus === FetchStatus.LOADING ? "loading" : "idle"}
                loadingContent={<Spinner />}
                items={rows}
            >
                {(item) => (
                    <TableRow key={item.key}>
                        {(columnKey) => (
                            <TableCell key={columnKey}>
                                {findValueByKey(item, String(columnKey))}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default DynamoTable;
