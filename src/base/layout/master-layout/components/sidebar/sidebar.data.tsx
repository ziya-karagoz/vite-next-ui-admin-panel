import { Icon } from "@iconify/react/dist/iconify.js";
import { ICollapseItem, ISidebarItem, ISidebarMenu } from "./sidebar.interfaces";

export const sidebarData: (ISidebarItem | ICollapseItem | ISidebarMenu)[] = [
    {
        id: "home",
        title: "Home",
        type: "single",
        icon: <Icon icon="ic:round-dashboard" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
        to: "/anasayfa",
    } as ISidebarItem,
    {
        id: "main-menu",
        title: "Main Menu",
        type: "menu",
        items: [
            {
                id: "admin",
                icon: <Icon icon="mdi:accounts" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
                title: "Admins",
                to: "/yoneticiler",
                type: "single",
            } as ISidebarItem,
            {
                id: "balances",
                icon: <Icon icon="ic:baseline-account-balance-wallet" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
                title: "Balances",
                items: [
                    {
                        id: "bank-accounts",
                        title: "Banks Accounts",
                        to: "/banks-accounts",
                    },
                    {
                        id: "credit-cards",
                        title: "Credit Cards",
                        to: "/credit-cards",
                    },
                    {
                        id: "loans",
                        title: "Loans",
                        to: "/loans",
                    },
                ],
                type: "collapse",
            } as ICollapseItem,
            {
                id: "reports",
                icon: <Icon icon="ic:baseline-assessment" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
                title: "Reports",
                to: "/raporlar",
                type: "single",
            } as ISidebarItem,
            {
                id: "settings",
                icon: <Icon icon="ic:baseline-settings" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
                title: "Settings",
                items: [
                    {
                        id: "profile-settings",
                        title: "Profile Settings",
                        to: "/profile-settings",
                    },
                    {
                        id: "security-settings",
                        title: "Security Settings",
                        to: "/security-settings",
                    },
                    {
                        id: "notification-settings",
                        title: "Notification Settings",
                        to: "/notification-settings",
                    },
                ],
                type: "collapse",
            } as ICollapseItem,
        ]
    } as ISidebarMenu,
    {
        id: "user-management",
        title: "User Management",
        type: "menu",
        items: [
            {
                id: "user-list",
                icon: <Icon icon="ic:baseline-people" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
                title: "User List",
                to: "/user-list",
                type: "single",
            } as ISidebarItem,
            {
                id: "roles-permissions",
                icon: <Icon icon="ic:baseline-lock" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
                title: "Roles & Permissions",
                to: "/roles-permissions",
                type: "single",
            } as ISidebarItem,
        ]
    } as ISidebarMenu,
    {
        id: "notifications",
        title: "Notifications",
        type: "single",
        icon: <Icon icon="ic:baseline-notifications" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
        to: "/bildirimler",
    } as ISidebarItem,
    {
        id: "analytics",
        title: "Analytics",
        type: "menu",
        items: [
            {
                id: "sales-analysis",
                icon: <Icon icon="ic:baseline-trending-up" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
                title: "Sales Analysis",
                to: "/sales-analysis",
                type: "single",
            } as ISidebarItem,
            {
                id: "customer-insights",
                icon: <Icon icon="ic:baseline-insights" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
                title: "Customer Insights",
                to: "/customer-insights",
                type: "single",
            } as ISidebarItem,
            {
                id: "performance-metrics",
                icon: <Icon icon="ic:baseline-bar-chart" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
                title: "Performance Metrics",
                to: "/performance-metrics",
                type: "single",
            } as ISidebarItem,
        ]
    } as ISidebarMenu,
];
