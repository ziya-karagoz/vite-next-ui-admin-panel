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
  POINT = "POINT",
  BADGE = "BADGE",
  DATE = "DATE",
  OPERATIONS = "OPERATIONS",
}

export enum EFilterType {
  SELECT = "SELECT",
  NUMBER = "NUMBER",
  DATE = "DATE",
}

export interface IColumn {
  key: string;
  label: string;
  type?: EColumnType;
  filterType?: EFilterType | undefined;
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

export interface ISelectFilter {
  id: string;
  type: "SELECT";
  operation: "EQUAL" | "NOT_EQUAL";
  selecteds: (string | number)[]
}

export interface INumberFilter {
  id: string;
  type: "NUMBER";
  min: number;
  max: number;
}

export interface IDateFilter {
  id: string;
  type: "DATE";
  min: number;
  max: number;
}

export type  IFilterChain = (ISearchFilter | ISelectFilter | INumberFilter | IDateFilter)[]