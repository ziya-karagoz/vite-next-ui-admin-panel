import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  NavbarItem,
} from "@nextui-org/react"
import { useAuth } from "@app/modules/auth/core/contexts/AuthContext";
import { DarkModeSwitch } from "./darkmodeswitch";

export const UserDropdown = () => {
  const { currentUser, logout } = useAuth();
  return (
    <Dropdown backdrop="blur">
      <NavbarItem>
        <DropdownTrigger>
          <Avatar
            as="button"
            color="success"
            // name should be currentUser?.first_name's first letter + currentUser?.last_name's first letter
            name={
              currentUser?.first_name.charAt(0) ??
              "" + currentUser?.last_name.charAt(0) ??
              ""
            }
            showFallback
            size="md"
            src={currentUser?.image}
          />
        </DropdownTrigger>
      </NavbarItem>
      <DropdownMenu
        aria-label="User menu actions"
        onAction={(actionKey) => console.log({ actionKey })}
      >
        <DropdownItem
          key="profile"
          className="flex flex-col justify-start w-full items-start"
        >
          <p>Signed in as</p>
          <p>{currentUser?.email}</p>
        </DropdownItem>
        <DropdownItem key="settings">My Settings</DropdownItem>
        <DropdownItem key="team_settings">Team Settings</DropdownItem>
        <DropdownItem key="analytics">Analytics</DropdownItem>
        <DropdownItem key="system">System</DropdownItem>
        <DropdownItem key="configurations">Configurations</DropdownItem>
        <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
        <DropdownItem
          onClick={() =>
            logout({
              alert: true,
            })
          }
          key="logout"
          color="danger"
          className="text-danger "
        >
          Log Out
        </DropdownItem>
        <DropdownItem key="switch">
          <DarkModeSwitch />
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
