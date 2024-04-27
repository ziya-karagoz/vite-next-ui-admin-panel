import { Sidebar } from "./sidebar.styles";
import { CompaniesDropdown } from "./CompaniesDropdown";
import { CollapseItems } from "./CollapseItems";
import { useSidebarContext } from "@base/layout/contexts/LayoutContext";
import { SidebarItem } from "./SidebarItem";
import { SidebarMenu } from "./SidebarMenu";
import { Icon } from "@iconify/react/dist/iconify.js";

export const SidebarWrapper = () => {
  const pathname = window.location.pathname;
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
          <CompaniesDropdown />
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<Icon icon="ic:round-dashboard" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>}
              isActive={pathname === "/"}
              href="/"
            />
            <SidebarMenu title="Main Menu">
              <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<Icon icon="mdi:accounts" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>}
                href="accounts"
              />

              <CollapseItems
                icon={<Icon icon="ic:baseline-account-balance-wallet" width="1.2rem" height="1.2rem" className="text-gray-400 dark:text-gray-200"/>}
                items={["Banks Accounts", "Credit Cards", "Loans"]}
                title="Balances"
              />
            </SidebarMenu>
          </div>
          <div className={Sidebar.Footer()}>

          </div>
        </div>
      </div>
    </aside>
  );
};
