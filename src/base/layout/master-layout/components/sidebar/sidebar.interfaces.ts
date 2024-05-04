
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
    items: (ISidebarItem | ICollapseItems)[];
    type: "menu";
    
}

export interface ICollapseItems {
    id: string;
    icon: React.ReactNode;
    title: string;
    items: ICollapseItem[];
    type: "collapse";
}