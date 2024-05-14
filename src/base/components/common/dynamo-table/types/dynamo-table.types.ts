export interface TableMeta {
  totalItems: number;
  itemCount: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export enum EColumnType {
  IMAGE = "IMAGE",
  PROFILE = "PROFILE",
  CHIP = "CHIP",
  BADGE = "BADGE",
  DATE = "DATE",
  OPERATIONS = "OPERATIONS",
}

export enum EFilterType {
  SELECT = "SELECT",
  STATIC_SELECT = "STATIC_SELECT",
  NUMBER = "NUMBER",
  DATE = "DATE",
}

export interface IColumn {
  key?: string;
  label: string;
  type?: EColumnType;
  filterType?: EFilterType;
  filterConfig?: {
    numberFilterAdornment?: React.ReactNode;
  };
  filterOptions?: IStataticSelectFilterItem[];
  columnConfig?: {
    chip: {
      color: { [key: string]: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined };
      text: { [key: string]: string };
    };
  }
}

export interface TableSearchColumn {
  id: string;
  type: "string" | "number";
}

export type IColumnFilterParams = {
  path: string;
  skip?: number;
  take?: number;
  group?: string;
};

export interface IFilterResponse {
  data: { key: any }[];
  totalCount: number;
}


export type ISearchFilter = {
  id: string;
  type: "SEARCH";
  value: string;
  columns: TableSearchColumn[];
}

export interface IStataticSelectFilterItem {
  value: any;
  name: string;
  label: string;
}

export interface ISelectFilter {
  id: string;
  type: "SELECT";
  operation: "EQUAL" | "NOT_EQUAL";
  selecteds: (string | number)[]
}

export interface INumberFilter {
  id: string;
  type: "NUMBER";
  min?: number;
  max?: number;
}

export interface IDateFilter {
  id: string;
  type: "DATE";
  min?: string;
  max?: string;
}

export type  IFilterChain = (ISearchFilter | ISelectFilter | INumberFilter | IDateFilter)[]