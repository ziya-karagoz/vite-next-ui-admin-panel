import {
  Button,
  Code,
  Input,
  Kbd,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Navbar,
  NavbarContent,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import { BurguerButton } from "./BurgerButton";
import { NotificationsDropdown } from "./NotificationsDropdown";
import { UserDropdown } from "./UserDropdown";
import { Icon } from "@iconify/react/dist/iconify.js";

interface Props {
  children: React.ReactNode;
}

export const NavbarWrapper = ({ children }: Props) => {

  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
    onOpenChange: onSearchOpenChange,
  }= useDisclosure();

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        // Your custom logic here
        onSearchOpen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar
        isBordered
        className="w-full"
        classNames={{
          wrapper: "w-full max-w-full",
        }}
      >
        <NavbarContent className="md:hidden">
          <BurguerButton />
        </NavbarContent>
        <NavbarContent className="w-full max-md:hidden">
          <Button
          onClick={onSearchOpen}
            variant="shadow"
            className="gap-4"
            startContent={
              <Icon
                width="1.2rem"
                height="1.2rem"
                icon="gravity-ui:magnifier"
              />
            }
            endContent={
              <Kbd>
                <abbr className="no-underline">⌃</abbr> K
              </Kbd>
            }
          >
            Search...
          </Button>
          <Modal size="2xl" classNames={{
            header: "p-0"
          }} isOpen={isSearchOpen} backdrop="blur" onOpenChange={onSearchOpenChange} hideCloseButton>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1" >
                <Input
                  placeholder="Quick Search..."
                  classNames={{
                    input: "w-full px-2 h-14 font-sans text-lg outline-none rounded-none bg-transparent text-default-700 placeholder-default-500 dark:text-default-500 dark:placeholder:text-default-300",
                    inputWrapper: "h-16",
                  }}
                  startContent={
                    <Icon
                      width="1.6rem"
                      height="1.6rem"
                      icon="gravity-ui:magnifier"
                    />
                  }
                endContent={<Kbd>ESC</Kbd>}
                />
                
              </ModalHeader>
              <ModalBody>
                <p> 
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Nullam pulvinar risus non risus hendrerit venenatis.
                  Pellentesque sit amet hendrerit risus, sed porttitor quam.
                </p>
                <p>
                  Magna exercitation reprehenderit magna aute tempor cupidatat consequat elit
                  dolor adipisicing. Mollit dolor eiusmod sunt ex incididunt cillum quis. 
                  Velit duis sit officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. 
                  Et mollit incididunt nisi consectetur esse laborum eiusmod pariatur 
                  proident Lorem eiusmod et. Culpa deserunt nostrud ad veniam.
                </p>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
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
