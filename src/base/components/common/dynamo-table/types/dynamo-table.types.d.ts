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

export interface IColumn {
  key: string;
  label: string;
  type?: EColumnType;
}