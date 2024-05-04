import React from "react";
import { Accordion, AccordionItem } from "@nextui-org/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ICollapseItem } from "./sidebar.interfaces";
import { NavLink } from "react-router-dom";

interface Props {
  icon: React.ReactNode;
  title: string;
  items: ICollapseItem[];
}

export const CollapseItems = ({ icon, items, title }: Props) => {
  return (
    <div className="flex gap-4 h-full items-center cursor-pointer">
      <Accordion className="px-0">
        <AccordionItem
          indicator={
            <Icon
              icon="mdi:chevron-up"
              width="1.2rem"
              height="1.2rem"
              className="text-gray-400 dark:text-gray-200"
            />
          }
          classNames={{
            indicator: "data-[open=true]:-rotate-180",
            trigger:
              "py-0 min-h-[44px] hover:bg-default-100 rounded-xl active:scale-[0.98] transition-transform px-3.5",

            title:
              "px-0 flex text-base gap-2 h-full items-center cursor-pointer",
          }}
          aria-label="Accordion 1"
          title={
            <div className="flex flex-row gap-2">
              <span>{icon}</span>
              <span>{title}</span>
            </div>
          }
        >
          <div className="pl-12">
            {items.map((item) => {
              if (item.to) {
                return (
                  <NavLink
                  to={item.to}
                    key={item.id}
                    className="collapse-navlink w-full flex  text-default-500 hover:text-default-900 transition-colors"
                  >
                    {item.title}
                  </NavLink>
                );
              } else if (item.onClick) {
                return (
                  <button
                    key={item.id}
                    onClick={item.onClick}
                    className="w-full flex  text-default-500 hover:text-default-900 transition-colors"
                  >
                    {item.title}
                  </button>
                );
              }
            })}
          </div>
        </AccordionItem>
      </Accordion>
    </div>
  );
};
