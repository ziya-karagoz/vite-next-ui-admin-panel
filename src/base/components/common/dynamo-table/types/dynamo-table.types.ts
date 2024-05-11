export interface TableMeta {
  totalItems: number;
  itemCount: number;
  totalPages: number;
  currentPage: number;
  itemsPerPage: number;
}

export enum EColumnType {
  IMAGE,
  PROFILE,
  POINT,
  BADGE,
  DATE,
  OPERATIONS,
}

export enum EFilterType {
  SELECT,
  NUMBER,
  DATE,
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