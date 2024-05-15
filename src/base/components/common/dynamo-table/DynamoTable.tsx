import {
    Avatar,
    Button,
    Chip,
    Input,
    Pagination,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Select,
    SelectItem,
    Spinner,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    Tooltip,
} from "@nextui-org/react";
import React from "react";
import { checkConditions, findValueByKey, generateUrl } from "./helper/helper";
import {
    EColumnType,
    IColumn,
    IFilterChain,
    IOperation,
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
import SortDropdown from "./components/SortDropdown";
import { hasPermission } from "@base/helpers/permissions/permission.helper";
import moment from "moment";

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

    const [localColumns, setLocalColumns] = React.useState<IColumn[]>(columns);

    // Store the initial order of columns
    const initialOrderRef = React.useRef<IColumn[]>(columns);

    const [sort, setSort] = React.useState<string | undefined>(
        localColumns.find((column) => column.key === searchParams.get("sort"))
            ?.key ?? undefined
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

    const renderOperations = (operations: IOperation[], row: any) => {
        return (
            <div className="flex gap-2">
                {operations.map(
                    (operation) =>
                        hasPermission(operation.role as string) &&
                        checkConditions(operation.conditions || [], row) && (
                            <Tooltip content={operation.text} key={operation.name}>
                                <Button
                                    size="sm"
                                    color="default"
                                    isIconOnly
                                    onClick={() => operation.handle(row.id, row)}
                                >
                                    {operation.icon}
                                </Button>
                            </Tooltip>
                        )
                )}
            </div>
        );
    };

    const handleColumnVisibilityChange = (value: boolean, column: IColumn) => {
        if (localColumns.length === 1 && !value) return;

        if (value) {
            const originalIndex = initialOrderRef.current.findIndex(
                (col) => col.key === column.key
            );
            setLocalColumns((prev) => {
                const newColumns = [...prev];
                newColumns.splice(originalIndex, 0, column);
                return newColumns;
            });
        } else {
            setLocalColumns((prev) =>
                prev.filter((localColumn) => localColumn.key !== column.key)
            );
        }
    };

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
                            placeholder="Search..."
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
                                    setFilterChain([]);
                                    setSort(undefined);
                                    navigate(pathname);
                                }}
                            >
                                <Icon icon="tabler:filter-x" width="1.2rem" height="1.2rem" />
                            </Button>
                        </Tooltip>

                        <Popover placement="bottom">
                            <PopoverTrigger>
                                <Button size="sm" color="default" isIconOnly>
                                    <Icon
                                        icon="heroicons:bars-3-bottom-right-16-solid"
                                        width="1.2rem"
                                        height="1.2rem"
                                    />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <div className="px-1 py-2">
                                    <div className="text-small font-bold mb-2">
                                        Columns Visibility
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        {columns.map((column) => (
                                            <Switch
                                                defaultSelected
                                                size="sm"
                                                isSelected={localColumns.some(
                                                    (localColumn) => localColumn.key === column.key
                                                )}
                                                onValueChange={(value) =>
                                                    handleColumnVisibilityChange(value, column)
                                                }
                                                key={column.key ?? column.label}
                                            >
                                                {column.label.length ? column.label : column.type}
                                            </Switch>
                                        ))}
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            }
            classNames={
                {
                    
                    wrapper: "fancy-scrollbar",
                }
            }
        >
            <TableHeader columns={localColumns}>
                {localColumns.map((column) => (
                    <TableColumn key={column.key ?? column.label}>
                        <div className="flex justify-start items-center gap-1">
                            {column.filterType !== undefined ? (
                                <FilterDropdown
                                    filterPath={filterPath}
                                    column={column}
                                    filterChain={filterChain}
                                    setFilterChain={setFilterChain}
                                />
                            ) : null}
                            <SortDropdown
                                column={column}
                                filterChain={filterChain}
                                sort={sort}
                                setSort={setSort}
                            />
                        </div>
                    </TableColumn>
                ))}
            </TableHeader>
            <TableBody
                loadingState={loadStatus === FetchStatus.LOADING ? "loading" : "idle"}
                loadingContent={<Spinner />}
                items={rows}
            >
                {(item) => (
                    <TableRow key={item.id || item.key}>
                        {localColumns.map((column) => {
                            if (column.type === EColumnType.OPERATIONS && column.operations) {
                                return (
                                    <TableCell key={column.label}>
                                        {renderOperations(column.operations, item)}
                                    </TableCell>
                                );
                            }

                            let value = findValueByKey(item, String(column.key));
                            if (column.customCell) {
                                value = column.customCell(item);
                            }
                            switch (column?.type) {
                                case EColumnType.CHIP:
                                    return (
                                        <TableCell key={column.key ?? column.label}>
                                            <Chip
                                                color={column.config?.chip?.color[value]}
                                                variant={column.config?.chip?.variant}
                                                size={column.config?.chip?.size}
                                            >
                                                {column.config?.chip?.text[value]}
                                            </Chip>
                                        </TableCell>
                                    );
                                case EColumnType.DATE:
                                    return (
                                        <TableCell key={column.key ?? column.label}>
                                            {moment(value).format(column.config?.date?.format)}
                                        </TableCell>
                                    );
                                case EColumnType.IMAGE:
                                    return (
                                        <TableCell key={column.key ?? column.label}>
                                            <Avatar radius={column.config?.avatar?.radius} src={value} alt={column.label} />
                                        </TableCell>
                                    );
                                default:
                                    return (
                                        <TableCell key={column.key ?? column.label}>
                                            {value}
                                        </TableCell>
                                    );
                            }
                        })}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default DynamoTable;
