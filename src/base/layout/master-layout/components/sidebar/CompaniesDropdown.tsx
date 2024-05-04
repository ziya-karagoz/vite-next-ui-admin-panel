import AppLogo from "@app/core/components/AppLogo";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";

interface Company {
  name: string;
  location: string;
  logo: React.ReactNode;
}

export const CompaniesDropdown = () => {
  const [company, setCompany] = useState<Company>({
    name: "Splintern Co.",
    location: "Beşiktaş, TR",
    logo: <AppLogo className="w-5 h-5" />,
  });
  return (
    <Dropdown
      classNames={{
        base: "w-full min-w-[260px]",
      }}
    >
      <DropdownTrigger className="cursor-pointer">
        <div className="flex items-center gap-2">
          {company.logo}
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
              {company.name}
            </h3>
            <span className="text-xs font-medium text-default-500">
              {company.location}
            </span>
          </div>
          <Icon
            icon="flowbite:caret-down-solid"
            width="1.2rem"
            height="1.2rem"
            className="text-gray-500"
          />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        onAction={(e) => {
          
          if (e === "1") {
            setCompany({
              name: "Splintern Co.",
              location: "Beşiktaş, TR",
              logo: <AppLogo className="w-5 h-5" />,
            });
          }
          if (e === "2") {
            setCompany({
              name: "Splintern Co.",
              location: "Los Angeles, US",
              logo: (
                <AppLogo className="w-5 h-5" />
              ),
            });
          }
        }}
        aria-label="Avatar Actions"
      >
        <DropdownSection title="Companies">
          <DropdownItem
            key="1"
            startContent={<AppLogo className="w-5 h-5" />}
            description="Beşiktaş, TR"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Splintern Co.
          </DropdownItem>
          <DropdownItem
            key="2"
            startContent={<AppLogo className="w-5 h-5" />}
            description="Los Angeles, US"
            classNames={{
              base: "py-4",
              title: "text-base font-semibold",
            }}
          >
            Splintern Co.
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
