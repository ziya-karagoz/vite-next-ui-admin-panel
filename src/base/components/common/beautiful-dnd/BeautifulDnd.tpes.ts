export interface IDndBox {
    id: string;
    content: any;
  }
  
  export interface IDndColumn {
    id: string;
    title: string;
    boxIds: string[];
    colClassname?: string;
    boxClassName?: string;
  }
  
  export interface IDndBoxs {
    [key: string]: IDndBox;
  }
  
  export interface IDndColumns {
    [key: string]: IDndColumn;
  }
  
  export interface IDndData {
    boxes: IDndBoxs;
    columns: IDndColumns;
    columnOrder: string[];
  }
  