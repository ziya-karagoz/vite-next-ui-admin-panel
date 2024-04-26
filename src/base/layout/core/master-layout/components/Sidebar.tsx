import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useMemo, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menus } from "../../data";
import clsx from "clsx";
import { hasPermissionMany } from "@base/helpers/permissions/permission.helper";

const SIDEBAR_CONFIG_KEY = import.meta.env.VITE_SIDEBAR_CONFIG_KEY;

const Sidebar = () => {
    //const isopenLocalStorage = JSON.parse(localStorage.getItem(SIDEBAR_CONFIG_KEY) || "true");

    const memoizedIsOpenLocalStorage = useMemo(() => {
        return JSON.parse(localStorage.getItem(SIDEBAR_CONFIG_KEY) || "true");
    }, []);

    const [open, setOpen] = useState(memoizedIsOpenLocalStorage);
    const [activeMenu, setActiveMenu] = useState(null);

    const toggleMenu = (index: any) => {
        if (activeMenu === index) {
            setActiveMenu(null);
        } else {
            setActiveMenu(index);
            if (!open && Menus[index].children) {
                changeOpen(true);
            }
        }
    };

    const changeOpen = (isOpen: boolean) => {
        setOpen(isOpen);
        localStorage.setItem(SIDEBAR_CONFIG_KEY, JSON.stringify(isOpen));
    };

    useEffect(() => {
        if (!open) {
            setActiveMenu(null);
        }
    }, [open]);

    return (
        <div
            className={clsx(
                "relative min-h-screen bg-white shadow-none hidden lg:block",
                {
                    "w-64": open,
                    "w-20": !open,
                }
            )}
        >
            <div
                className={clsx(
                    " min-h-screen pr-2 pb-5 pl-0 pt-8 duration-300  hidden lg:block  border-r border-r-gray-100 fixed top-0 left-0 h-full bg-white z-50",
                    {
                        "w-64": open,
                        "w-20": !open,
                    }
                )}
            >
                <svg
                    className={`absolute cursor-pointer right-1 top-9 w-3 z-50 bg-transparent shadow-mdborder-2 rounded-md  ${!open && "rotate-180"
                        }`}
                    onClick={() => changeOpen(!open)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                >
                    <g fill="none" fillRule="evenodd">
                        <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                        <path
                            className="fill-gray-300"
                            d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z"
                        />
                    </g>
                </svg>
                <div
                    className={clsx({
                        "px-5 py-1 flex gap-x-4 items-center": open,
                        "flex justify-center items-center": !open,
                    })}
                >
                    <svg
                        className={clsx("w-8 h-8 me-2", {
                            // when open is true do not show
                            hidden: open,
                        })}
                        width="142"
                        height="142"
                        viewBox="0 0 142 142"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <g clipPath="url(#clip0_547_588)">
                            <path
                                d="M69.2 72L58 60.7H38.5L70.9 97.7L129.8 13.7V0L69.2 72Z"
                                fill="#7F2629"
                            />
                            <path
                                d="M111.5 56.7C113.3 61.5 114.3 66.6 114.3 72C114.3 96 94.9 115.5 70.8 115.5C46.8 115.5 27.2999 96 27.2999 72C27.2999 48 46.8 28.5 70.8 28.5C77.5 28.5 83.8 30 89.4 32.7L106.6 12.2C96.2 5.99999 84 2.39999 70.8 2.39999C32.4 2.39999 1.19995 33.6 1.19995 72.1C1.19995 110.6 32.4 141.8 70.9 141.8C109.4 141.8 140.6 110.6 140.6 72.1C140.6 57.5 136.1 44 128.4 32.8L111.5 56.7Z"
                                fill="#E61111"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_547_588">
                                <rect width="141.7" height="141.7" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <Link to="/">
                        <img
                            src="/logo.webp"
                            className={clsx(" h-4 rounded-md transition-all duration-300", {
                                "flex gap-x-4 items-center": open,
                                "scale-0 hidden": !open,
                            })}
                        />
                    </Link>
                </div>
                <ul className="kk-sidebar pt-6 overflow-y-auto h-[calc(100%-3rem)]">
                    {Menus.map((Menu, index) => {
                        if (Menu?.roles) {
                            return hasPermissionMany(Menu.roles) ? (
                                <li key={index}>
                                    {Menu.to ? (
                                        <NavLink
                                            to={Menu.to}
                                            className={clsx(
                                                "flex justify-between p-3 cursor-pointer hover:bg-gray-50 text-gray-900 text-sm items-center",
                                                {

                                                    active: activeMenu === index,
                                                }
                                            )}
                                            onClick={() => toggleMenu(index)}
                                        >
                                            <div className="ml-4 flex items-center gap-x-4">
                                                <Icon icon={Menu.icon} />
                                                <span
                                                    className={clsx("origin-left duration-200", {
                                                        hidden: !open,
                                                    })}
                                                >
                                                    {Menu.title}
                                                </span>
                                            </div>
                                            {Menu.children && (
                                                <Icon
                                                    icon="mingcute:down-fill"
                                                    className={clsx("transition-transform duration-200", {
                                                        "rotate-180": activeMenu === index,
                                                    })}
                                                />
                                            )}
                                        </NavLink>
                                    ) : (
                                        <div
                                            className={clsx(
                                                "flex justify-between p-3 cursor-pointer hover:bg-gray-50 text-gray-900 text-sm items-center",
                                                {

                                                    active: activeMenu === index,
                                                }
                                            )}
                                            onClick={() => toggleMenu(index)}
                                        >
                                            <div className="ml-4 flex items-center gap-x-4">
                                                <Icon icon={Menu.icon} />
                                                <span
                                                    className={clsx("origin-left duration-200", {
                                                        hidden: !open,
                                                    })}
                                                >
                                                    {Menu.title}
                                                </span>
                                            </div>
                                            {Menu.children && (
                                                <Icon
                                                    icon="mingcute:down-fill"
                                                    className={clsx("transition-transform duration-200", {
                                                        "rotate-180": activeMenu === index,
                                                    })}
                                                />
                                            )}
                                        </div>
                                    )}

                                    {Menu.children && (
                                        <ul
                                            className={clsx(
                                                "fancy-scrollbar pl-4 transition-[max-height] duration-300 overflow-y-auto",
                                                {
                                                    "max-h-96": activeMenu === index,
                                                    "max-h-0": activeMenu !== index,
                                                }
                                            )}
                                        >
                                            {Menu.children.map((child, childIndex) =>
                                                hasPermissionMany(child.roles) ? (
                                                    child.to ? (
                                                        <NavLink
                                                            to={child.to}
                                                            key={childIndex}
                                                            className="ml-2 flex p-2 cursor-pointer hover:bg-gray-50 text-gray-900 text-sm items-center gap-x-4 mt-2"
                                                        >
                                                            <Icon icon="radix-icons:dot-filled" />
                                                            <span
                                                                className={`${!open && "hidden"
                                                                    } origin-left duration-200`}
                                                            >
                                                                {child.title}
                                                            </span>
                                                        </NavLink>
                                                    ) : null
                                                ) : null
                                            )}
                                        </ul>
                                    )}
                                </li>
                            ) : null;
                        } else {
                            return !open ? (
                                <div className="flex justify-center items-center py-6 text-gray-400"><Icon icon="solar:menu-dots-bold" /></div>) : (
                                <div className="flex justify-between p-3 ml-4 mt-4 font-mono text-xs tracking-wide items-center text-gray-400 uppercase">{Menu.section}</div>
                            );

                        }
                    })}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
