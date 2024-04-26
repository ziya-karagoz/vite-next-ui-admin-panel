import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import clsx from "clsx";
import { hasPermissionMany } from "@base/helpers/permissions/permission.helper";
import { Menus } from "../../data";
import { NavLink, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    // const { currentUser } = useAuth();
    const [open, setOpen] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState(null);

    const toggleMenu = (index: any) => {
        if (activeMenu === index) {
            setActiveMenu(null);
        } else {
            setActiveMenu(index);
            if (!open && Menus[index].children) {
                setOpen(true);
            }
        }
    };



    return (
        <header >
            <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 border-b border-b-gray-100 shadow-none h-16">
                <div className="flex flex-wrap justify-between items-center mx-auto ">

                    <div className="flex items-center gap-x-2 lg:order-1">
                        <a href="#" className="flex items-center gap-x-2 lg:hidden">
                            <svg className="w-12 h-12 me-2" width="142" height="142" viewBox="0 0 142 142" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_547_588)">
                                    <path d="M69.2 72L58 60.7H38.5L70.9 97.7L129.8 13.7V0L69.2 72Z" fill="#7F2629" />
                                    <path d="M111.5 56.7C113.3 61.5 114.3 66.6 114.3 72C114.3 96 94.9 115.5 70.8 115.5C46.8 115.5 27.2999 96 27.2999 72C27.2999 48 46.8 28.5 70.8 28.5C77.5 28.5 83.8 30 89.4 32.7L106.6 12.2C96.2 5.99999 84 2.39999 70.8 2.39999C32.4 2.39999 1.19995 33.6 1.19995 72.1C1.19995 110.6 32.4 141.8 70.9 141.8C109.4 141.8 140.6 110.6 140.6 72.1C140.6 57.5 136.1 44 128.4 32.8L111.5 56.7Z" fill="#E61111" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_547_588">
                                        <rect width="141.7" height="141.7" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span className="hidden sm:block self-center text-xl font-semibold whitespace-nowrap ">
                                Konutkonfor
                            </span>
                        </a>
                        <button
                            type="button"
                            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 "
                            onClick={() => setOpen((prev) => !prev)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <svg
                                className="hidden w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                        </button>
                        {/* Go Back Button Start */}
                        <div
                            className="items-center gap-x-2 flex bg-gray-50 hover:bg-gray-100 p-2.5 rounded-lg cursor-pointer text-red-500"
                            onClick={() => navigate(-1)}
                        >
                            <Icon icon="lets-icons:refund-back" />
                            <span className="hidden md:block me-2 text-sm font-semibold">Geri Dön</span>
                        </div>
                        {/* Go Back Button End */}
                    </div>



                    <div className="flex items-center lg:order-2 gap-x-2">
                        ***
                    </div>
                    <div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"></div>
                </div>
            </nav>
            <div
                className={clsx(
                    "navbar-menu relative z-50 transition-[max-width] duration-300 overflow-hidden",
                    {
                        hidden: !open,
                    }
                )}
            >
                <div
                    className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
                    onClick={() => setOpen(false)}
                ></div>
                <nav
                    className={clsx(
                        "fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto"
                    )}
                >
                    <div className="flex items-center mb-8">
                        <a className="mr-auto text-3xl font-bold leading-none" href="#">
                            <svg className="w-12 h-12 me-2" width="142" height="142" viewBox="0 0 142 142" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_547_588)">
                                    <path d="M69.2 72L58 60.7H38.5L70.9 97.7L129.8 13.7V0L69.2 72Z" fill="#7F2629" />
                                    <path d="M111.5 56.7C113.3 61.5 114.3 66.6 114.3 72C114.3 96 94.9 115.5 70.8 115.5C46.8 115.5 27.2999 96 27.2999 72C27.2999 48 46.8 28.5 70.8 28.5C77.5 28.5 83.8 30 89.4 32.7L106.6 12.2C96.2 5.99999 84 2.39999 70.8 2.39999C32.4 2.39999 1.19995 33.6 1.19995 72.1C1.19995 110.6 32.4 141.8 70.9 141.8C109.4 141.8 140.6 110.6 140.6 72.1C140.6 57.5 136.1 44 128.4 32.8L111.5 56.7Z" fill="#E61111" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_547_588">
                                        <rect width="141.7" height="141.7" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                        </a>
                        <button
                            onClick={() => setOpen(false)}
                            className="ml-auto lg:hidden"
                        >
                            <svg
                                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                ></path>
                            </svg>
                        </button>
                    </div>
                    <div>
                        <ul className="pt-6">
                            {Menus.map((Menu, index) => {
                                if (Menu?.roles) {
                                    return hasPermissionMany(Menu.roles) ? (
                                        <li
                                            key={index}
                                            onClick={() => {
                                                Menu.to && setOpen(false);
                                            }}
                                        >
                                            {Menu.to ? (
                                                <NavLink
                                                    to={Menu.to}
                                                    className={clsx(
                                                        "flex justify-between p-3 cursor-pointer hover:bg-gray-100 text-gray-900 text-sm items-center",


                                                    )}
                                                    onClick={() => toggleMenu(index)}
                                                >
                                                    <div className="flex items-center gap-x-4">
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
                                                            className={clsx(
                                                                "transition-transform duration-200",
                                                                {
                                                                    "rotate-180": activeMenu === index,
                                                                }
                                                            )}
                                                        />
                                                    )}
                                                </NavLink>
                                            ) : (
                                                <div
                                                    className={clsx(
                                                        "flex justify-between p-3 cursor-pointer hover:bg-gray-100 text-gray-900 text-sm items-center",
                                                        {
                                                            active: activeMenu === index,
                                                        }
                                                    )}
                                                    onClick={() => toggleMenu(index)}
                                                >
                                                    <div className="flex items-center gap-x-4">
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
                                                            className={clsx(
                                                                "transition-transform duration-200",
                                                                {
                                                                    "rotate-180": activeMenu === index,
                                                                }
                                                            )}
                                                        />
                                                    )}
                                                </div>
                                            )}

                                            {Menu.children && (
                                                <ul
                                                    className={clsx(
                                                        "pl-4 transition-[max-height] duration-300 overflow-hidden",
                                                        {
                                                            "max-h-40": activeMenu === index,
                                                            "max-h-0": activeMenu !== index,
                                                        }
                                                    )}
                                                >
                                                    {Menu.children.map((child, childIndex) =>
                                                        hasPermissionMany(child.roles) ? (
                                                            child.to ? (
                                                                <li
                                                                    onClick={() => setOpen(false)}
                                                                    key={childIndex}
                                                                >
                                                                    <NavLink
                                                                        to={child.to}
                                                                        key={childIndex}
                                                                        className="flex p-2 cursor-pointer hover:bg-gray-100 text-gray-900 text-sm items-center gap-x-4 mt-2"
                                                                    >
                                                                        <Icon icon="radix-icons:dot-filled" />
                                                                        <span
                                                                            className={`${!open && "hidden"
                                                                                } origin-left duration-200`}
                                                                        >
                                                                            {child.title}
                                                                        </span>
                                                                    </NavLink>
                                                                </li>
                                                            ) : null
                                                        ) : null
                                                    )}
                                                </ul>
                                            )}
                                        </li>
                                    ) : null
                                }
                            }
                            )}
                        </ul>
                    </div>
                    <div className="mt-auto">
                        <div className="pt-6"></div>
                        <p className="my-4 text-xs text-center text-gray-400">
                            <span>Copyright © {new Date().getFullYear()}</span>
                        </p>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;
