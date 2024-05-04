import React from "react";
import { useSidebarContext } from "@base/layout/contexts/LayoutContext";
import { NavLink } from "react-router-dom";

interface Props {
  title: string;
  icon: React.ReactNode;
  to?: string;
}

export const SidebarItem = ({ icon, title, to = "" }: Props) => {
  const { setCollapsed } = useSidebarContext();
  const handleClick = () => {
    if (window.innerWidth < 768) {
      setCollapsed();
    }
  };
  return (
    <NavLink
      to={to}
      className=" active:bg-none max-w-full hover:bg-default-100 rounded-xl"
    >
      <button
        className="flex gap-2 w-full min-h-[44px] h-full items-center px-3.5  cursor-pointer transition-all duration-150 active:scale-[0.98]"
        onClick={handleClick}
      >
        {icon}
        <span className="">{title}</span>
      </button>
    </NavLink>
  );
};
