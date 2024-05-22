import { Link, Navbar, NavbarContent } from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./BurgerButton";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserDropdown } from "./UserDropdown";
import { Icon } from "@iconify/react/dist/iconify.js";
import RouteSearcher from "./RouteSearcher";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full border-b border-default-100",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <RouteSearcher />
        </NavbarContent>
        <NavbarContent
          justify="end"
          className="w-fit data-[justify=end]:flex-grow-0"
        >
          <div className="flex items-center gap-2 max-md:hidden">
            <Icon
              width="1.2rem"
              height="1.2rem"
              className="text-gray-400 "
              icon="formkit:megaphone"
            />
            <span>Feedback?</span>
          </div>

          <NotificationsDropdown />

          <div className="max-md:hidden">
            <Icon
              width="1.2rem"
              height="1.2rem"
              className="text-gray-400 "
              icon="mage:message-question-mark-round"
            />
          </div>

          <Link
            href="https://github.com/ziya-karagoz/vite-next-ui-admin-panel"
            target={"_blank"}
          >
            <Icon
              icon="bi:github"
              width="1.2rem"
              height="1.2rem"
              className="text-gray-400 "
            />
          </Link>
          <NavbarContent>
            <UserDropdown />
          </NavbarContent>
        </NavbarContent>
      </Navbar>
      {children}
    </div>
  );
};
