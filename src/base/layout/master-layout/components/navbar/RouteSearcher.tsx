import { Icon } from "@iconify/react/dist/iconify.js";
import {
    Button,
    Kbd,
    Link,
    Modal,
    ModalBody,
    ModalContent,
    useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { Command } from "cmdk";
import { sidebarData } from "../sidebar/sidebar.data";
import {
    ICollapseItem,
    ISidebarItem,
    ISidebarMenu,
} from "../sidebar/sidebar.interfaces";

function RouteSearcher() {
    const [searchKeyword, setSearchKeyword] = React.useState<string>("");

    const [searchedResults, setSearchedResults] = React.useState<
        (ISidebarItem | ICollapseItem | ISidebarMenu)[]
    >([]);

    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === "k") {
                event.preventDefault();
                onOpen();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    const searchSidebarData = (keyword: string) => {
        console.log("keyword", keyword);
        return sidebarData.filter((item) => {
            if (item.type === "single") {
                return item.title.toLowerCase().includes(keyword.toLowerCase());
            } else if (item.type === "menu") {
                return item.items.some((subItem) => {
                    if (subItem.type === "single") {
                        return subItem.title.toLowerCase().includes(keyword.toLowerCase());
                    } else if (subItem.type === "collapse") {
                        return subItem.items.some((collapseItem) => {
                            return collapseItem.title
                                .toLowerCase()
                                .includes(keyword.toLowerCase());
                        });
                    }
                });
            }
        });
    };

    const handleInputChange = (value: string) => {
        if (value.length === 0) {
            setSearchKeyword("");
            setSearchedResults([]);
            return;
        }
        setSearchKeyword(value);
        const results = searchSidebarData(value);
        setSearchedResults(results);
    };
    return (
        <React.Fragment>
            <Button
                onClick={onOpen}
                variant="shadow"
                className="gap-4"
                startContent={
                    <Icon width="1.2rem" height="1.2rem" icon="gravity-ui:magnifier" />
                }
                endContent={
                    <Kbd>
                        <abbr className="no-underline">⌃</abbr> K
                    </Kbd>
                }
            >
                Search...
            </Button>
            <Modal
                size="lg"
                classNames={{
                    header: "p-0",
                }}
                isOpen={isOpen}
                backdrop="blur"
                onOpenChange={onOpenChange}
                hideCloseButton
            >
                <ModalContent>
                    {() => (
                        <ModalBody className="px-0">
                            <Command label="Command Menu" loop >
                                <div className="flex items-center w-full px-4 border-b border-default-400/50 dark:border-default-100">
                                    <Icon icon="ep:search" width="1.2rem" height="1.2rem" />
                                    <Command.Input
                                    placeholder="Quick search..."
                                        value={searchKeyword}
                                        onValueChange={handleInputChange}
                                        autoFocus
                                        className="w-full px-2 h-14 font-sans text-lg outline-none rounded-none bg-transparent text-default-700 placeholder-default-500 dark:text-default-500 dark:placeholder:text-default-300"
                                    />
                                    {searchKeyword.length > 0 && (
                                        <Button
                                            isIconOnly
                                            color="default"
                                            variant="bordered"
                                            className="ml-4"
                                            size="sm"
                                            onClick={() => {
                                                setSearchKeyword("");
                                            }}
                                        >
                                            <Icon icon="ic:round-close" />
                                        </Button>
                                    )}
                                    <Command.Loading />
                                    <Kbd className="ml-2">ESC</Kbd>
                                </div>
                                <Command.List className="px-4 mt-2 pb-4 overflow-y-auto max-h-[50vh] fancy-scrollbar">
                                    <Command.Empty className="h-36 flex justify-center items-center">
                                        No results found.
                                    </Command.Empty>

                                    {searchedResults.map((item) => {
                                        if (item.type === "single") {
                                            return (
                                                <Command.Item className="mb-2" key={item.id}>
                                                        <Button
                                                            as={Link}
                                                            href={item.to}
                                                            className="w-full py-8 justify-between"
                                                            color="primary"
                                                            variant="bordered"
                                                            startContent={
                                                                <div className="flex justify-start items-center gap-2">
                                                                    {item.icon}
                                                                    <span>{item.title}</span>
                                                                </div>
                                                            }
                                                            endContent={
                                                                <Icon
                                                                    icon="mingcute:right-line"
                                                                    width="1.2rem"
                                                                    height="1.2rem"
                                                                />
                                                            }
                                                        />
                                                </Command.Item>
                                            );
                                        } else if (item.type === "menu") {
                                            return item.items.map((subItem) => {
                                                if (subItem.type === "single") {
                                                    return (
                                                        <Command.Item className="mb-2" key={subItem.id}>
                                                                <Button
                                                                    as = {Link}
                                                                    href={subItem.to}
                                                                    className="w-full py-8 justify-between"
                                                                    color="primary"
                                                                    variant="bordered"
                                                                    startContent={
                                                                        <div className="flex justify-start items-center gap-2">
                                                                            {subItem.icon}
                                                                            <span>{subItem.title}</span>
                                                                        </div>
                                                                    }
                                                                    endContent={
                                                                        <Icon
                                                                            icon="mingcute:right-line"
                                                                            width="1.2rem"
                                                                            height="1.2rem"
                                                                        />
                                                                    }
                                                                />
                                                        </Command.Item>
                                                    );
                                                } else if (subItem.type === "collapse") {
                                                    return subItem.items.map((collapseItem) => {
                                                        return (
                                                            <Command.Item
                                                                className="mb-2"
                                                                key={collapseItem.id}
                                                            >
                                                                    <Button
                                                                        as={Link}
                                                                        href={collapseItem.to}
                                                                        className="w-full py-8 justify-between"
                                                                        color="primary"
                                                                        variant="bordered"
                                                                        startContent={
                                                                            <div className="flex justify-start items-center gap-2">
                                                                                <span>{collapseItem.title}</span>
                                                                            </div>
                                                                        }
                                                                        endContent={
                                                                            <Icon
                                                                                icon="mingcute:right-line"
                                                                                width="1.2rem"
                                                                                height="1.2rem"
                                                                            />
                                                                        }
                                                                    />
                                                            </Command.Item>
                                                        );
                                                    });
                                                }
                                            });
                                        }
                                    })}
                                </Command.List>
                            </Command>
                        </ModalBody>
                    )}
                </ModalContent>
            </Modal>
        </React.Fragment>
    );
}

export default RouteSearcher;
