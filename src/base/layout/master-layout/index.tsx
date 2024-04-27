import { Outlet } from "react-router-dom";
import React from "react";
import { useAuth } from "@app/modules/auth/core/contexts/AuthContext";
import { SidebarContext } from "@base/layout/contexts/LayoutContext";
import { useLockedBody } from "@base/layout/hooks/useBodyLock";
import { SidebarWrapper } from "./components/sidebar/Sidebar";
import { NavbarWrapper } from "./components/navbar/Navbar";

/**
 * @author ziyakaragoz
 * Yazilacak butun componentlerin ust yapisidir.
 * Ornegin header, footer, sidebar gibi componentlerin hepsi bu componentin icinde olacak.
 * bu componentin bir ustunde intl provider oldugu icin bu
 * componentin ustundeki componentlerde react-intl metodlari kullanilamaz.
 */

const MasterLayout: React.FC = () => {
  const { currentUser } = useAuth();

  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const [_, setLocked] = useLockedBody(false);
  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    setLocked(!sidebarOpen);
  };

  if (!currentUser) return <Outlet />;
  return (
    <SidebarContext.Provider
      value={{
        collapsed: sidebarOpen,
        setCollapsed: handleToggleSidebar,
      }}
    >
      <section className="flex">
        <SidebarWrapper />
        <NavbarWrapper>
          <div className="p-8">
          <Outlet />
          </div>
        </NavbarWrapper>
      </section>
    </SidebarContext.Provider>
  );
};

export { MasterLayout };
