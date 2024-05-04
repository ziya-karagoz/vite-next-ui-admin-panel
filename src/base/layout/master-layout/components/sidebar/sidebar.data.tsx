import { Icon } from "@iconify/react/dist/iconify.js";
import { ICollapseItems, ISidebarItem, ISidebarMenu } from "./sidebar.interfaces";


export const sidebarData: (ISidebarItem | ICollapseItems | ISidebarMenu)[] = [
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
                id: "accounts",
                icon: <Icon icon="mdi:accounts" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>,
                title: "Accounts",
                to: "/accounts",
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
            } as ICollapseItems,
        ]
    } as ISidebarMenu
];
