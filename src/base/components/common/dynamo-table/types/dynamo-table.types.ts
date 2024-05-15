import { ERole } from "@base/enums/role.enum";

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
  DATE = "DATE",
  OPERATIONS = "OPERATIONS",
  CUSTOM = "CUSTOM",
}

export enum EFilterType {
  SELECT = "SELECT",
  STATIC_SELECT = "STATIC_SELECT",
  NUMBER = "NUMBER",
  DATE = "DATE",
}

export enum IConditionLogic {
  EQUAL = "EQUAL",
  NOT_EQUAL = "NOT_EQUAL",
  GREATER_THAN = "GREATER_THAN",
  LESS_THAN = "LESS_THAN",
  GREATER_THAN_OR_EQUAL = "GREATER_THAN_OR_EQUAL",
  LESS_THAN_OR_EQUAL = "LESS_THAN_OR_EQUAL",
  IN = "IN",
  NOT_IN = "NOT_IN",
}

export interface IOperation {
  name: string;
  icon: React.ReactNode;
  text: string;
  handle: (id: any, row: any) => void;
  role: ERole;
  conditions?: { key: string; value?: any; logic: IConditionLogic }[];
}

export interface IColumn {
  key?: string;
  label: string;
  type?: EColumnType;
  filterType?: EFilterType;
  operations?: IOperation[];
  filterConfig?: {
    numberFilterAdornment?: React.ReactNode;
  };
  filterOptions?: IStataticSelectFilterItem[];
  customCell?: (row: any) => React.ReactNode;
  config?: {
    chip?: {
      variant?: "flat" | "shadow" | "dot" | "solid" | "bordered" | "light" | "faded";
      size?: "lg" | "sm" | "md";
      color: { [key: string]: "default" | "primary" | "secondary" | "success" | "warning" | "danger" | undefined };
      text: { [key: string]: string };
    };
    date?: {
      format?: string;
    };
    avatar?:{
      radius: "md" | "none" | "sm" | "lg" | "full";
    }
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