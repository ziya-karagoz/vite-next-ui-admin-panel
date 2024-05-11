export interface TableMeta {
    totalItems: number;
    itemCount: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
  }

export interface PageableResponseModel<T> {
    items: T[];
    meta: TableMeta;
  }