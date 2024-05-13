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

    const [filterChain, setFilterChain] = React.useState<IFilterChain>(
        JSON.parse(searchParams.get("filter")!) ?? []
    );
    const [search, setSearch] = React.useState<string>((filterChain?.find((filter) => filter?.id === "global_search") as ISearchFilter)?.value ?? "");

    const debouncedSearch = useDebounce(search, 500);
    const bottomContent = React.useMemo(() => {
        function handlePrevious(
            meta: { currentPage: number },
            pathname: string,
            searchParams: URLSearchParams,
            navigate: (path: string) => void
        ): void {
            if (meta.currentPage === 1) return;

            const updates = {
                skip: Math.max(meta.currentPage - 1, 1).toString(),
            };

            const path = generateUrl(pathname, searchParams, updates);
            navigate(path);
        }

        function handlePageChange(page: number): void {
            const updates = {
                skip: page.toString(),
            };
            const path = generateUrl(pathname, searchParams, updates);
            navigate(path);
        }

        // Example usage in handleNext
        function handleNext(
            meta: { currentPage: number; totalPages: number },
            pathname: string,
            searchParams: URLSearchParams,
            navigate: (path: string) => void
        ): void {
            if (meta.currentPage === meta.totalPages) return;
            const updates = {
                skip: (meta.currentPage + 1).toString(), // Increment page number
            };

            const path = generateUrl(pathname, searchParams, updates);
            navigate(path);
        }

        function handleTakeChange(
            event: React.ChangeEvent<HTMLSelectElement>
        ): void {
            const updates = {
                take: event.target.value,
                skip: "1",
            };
            const path = generateUrl(pathname, searchParams, updates);
            navigate(path);
        }

        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Select
                    aria-label="Select"
                    defaultSelectedKeys={[5]}
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
                        onPress={() =>
                            handlePrevious(
                                {
                                    currentPage: meta.currentPage,
                                },
                                pathname,
                                searchParams,
                                navigate
                            )
                        }
                    >
                        Previous
                    </Button>
                    <Button
                        isDisabled={meta.totalPages === meta.currentPage}
                        size="sm"
                        variant="flat"
                        onPress={() =>
                            handleNext(
                                {
                                    currentPage: meta.currentPage,
                                    totalPages: meta.totalPages,
                                },
                                pathname,
                                searchParams,
                                navigate
                            )
                        }
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
        };
        const path = generateUrl(pathname, searchParams, updates);
        navigate(path);
    }, [filterChain]);

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
                   <Tooltip content="Clear Filters">
                   <Button
                        size="sm"
                        color="default"
                        isIconOnly
                        onClick={() => setFilterChain([])}
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
                            <span className={clsx("cursor-pointer",{
                        "text-primary-500": filterChain.some((filter) => filter.id === column.key),
                    })}>{column.label}</span>
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
