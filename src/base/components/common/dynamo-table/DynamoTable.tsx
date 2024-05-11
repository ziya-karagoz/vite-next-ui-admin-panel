import {
    Button,
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
} from "@nextui-org/react";
import React from "react";
import { findValueByKey, generateUrl } from "./helper/helper";
import { IColumn, TableMeta } from "./types/dynamo-table.types";
import { FetchStatus } from "@base/enums/api.enum";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { takes } from "./data/data";

type DynamoTableProps = {
    title: string;
    columns: IColumn[];
    rows: any[]; // vague type
    loadStatus: FetchStatus;
    meta: TableMeta;
};

const DynamoTable: React.FC<DynamoTableProps> = ({
    title,
    columns,
    rows,
    loadStatus,
    meta,
}) => {
    const { pathname } = useLocation();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

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

        function handleTakeChange(event: React.ChangeEvent<HTMLSelectElement>): void {
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

    return (
        <Table
            selectionBehavior="replace"
            aria-label={title}
            bottomContent={bottomContent}
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
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
