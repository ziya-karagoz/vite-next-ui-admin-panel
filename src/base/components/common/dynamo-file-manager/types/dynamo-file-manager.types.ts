import React from "react";

export interface DynamoFileData {
    isDirectory: boolean;
    items?: DynamoFileData[];
    name: string;
    size: number;
    url: string;
}

export interface DynamoFileManagerConfig {
    card?: {
        itemClasses?: {
            base?: string;
            body?: string;
            footer?: string;
            header?: string;
        };
    };
    loader?: React.ReactNode;
    
    toolbar?: {
        className?: string;
        actionsClassName?: string;
        newDirectoryButton?: {
            className?: string;
            title?: string;
            icon?: React.ReactNode;
        };
        uploadfileButton?: {
            className?: string;
            title?: string;
            icon?: React.ReactNode;
        };
        refreshButton?: {
            className?: string;
            title?: string;
            icon?: React.ReactNode;
        };
        renameButton?: {
            className?: string;
            title?: string;
            icon?: React.ReactNode;
        };
    };
    sidebar?: {
        wrapperClassName?: string;
        accordion?: {
            className?: string;
            itemClasses: {
                base?: string;
                title?: string;
                trigger?: string;
                indicator?: string;
                content?: string;
                heading?: string;
                startContent?: string;
                subtitle?: string;
                titleWrapper?: string;
            };
        };
        activeDirectoryClassName?: string;
        button?: {
            className?: string;
        };
    };
    mainContent?: {
        className?: string;
        wrapper?: {
            className?: string;
        };
        button?: {
            className?: string;
            icon?: React.ReactNode;
            title?: string;
        };
        table?: {
            classNames?: {
                base?: string;
                wrapper?: string;
                emptyWrapper?: string;
                loadingWrapper?: string;
                sortIcon?: string;
                table?: string;
                tbody?: string;
                td?: string;
                tfoot?: string;
                th?: string;
                thead?: string;
                tr?: string;
            };
            colNames?: {
                name?: string;
                type?: string;
                size?: string;
                actions?: string;
            };
            emptyContent?: React.ReactNode;
            modal?: {
                size?: "xl" | "xs" | "sm" | "md" | "lg" | "2xl" | "3xl" | "4xl" | "5xl" | "full" ;
                classNames?: {
                    backdrop?: string,
                    base?: string,
                    body?: string,
                    closeButton?: string,
                    footer?: string,
                    header?: string,
                    wrapper?: string,
                  }
                  image?: {
                    width?: string | number;
                    isBlurred?: boolean;
                    className?: string;
                  }
                  actionButtons?:{ 
                    cancel?: {
                        className?: string;
                        title?: string;
                    }
                    pick?: {
                        className?: string;
                        title?: string;
                    }
                  }
            }
        };
    };
}
