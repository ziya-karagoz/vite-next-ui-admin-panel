
export interface ISidebarItem {
    id: string;
    title: string;
    icon: React.ReactNode;
    to: string;
    type: "single";
}

export interface ICollapseItem {
    id: string;
    title: string;
    to?: string;
    onClick?: () => void;
}

export interface ISidebarMenu {
    id: string;
    title: string;
    items: (ISidebarItem | ICollapseItem)[];
    type: "menu";
    
}

export interface ICollapseItem {
    id: string;
    icon: React.ReactNode;
    title: string;
    items: ICollapseItem[];
    type: "collapse";
}