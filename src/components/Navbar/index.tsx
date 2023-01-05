import { useState } from "react";
import { Flex, Button, IconButton } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import Image from "next/image";

interface IProps {
  account: string | null;
  handler: () => {}
}

export const Navbar = ({ account, handler }: IProps) => {
  const [display, changeDisplay] = useState("none");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Flex>
      <Flex
        top="1rem"
        right="1rem"
        align="center"
        w={["50px", "50px", "100%", "100%"]}
      >
        {/* Desktop */}
        <Flex
          display={["none", "none", "flex", "flex"]}
          justify="space-between"
          w="100%"
          padding={2}
        >
          <Flex align="center">
            <NextLink href="/" passHref>
              <Image src="/logo.png" width={100} height={100} alt="logo" />
            </NextLink>

            <NextLink href="/create" passHref>
              <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
                Create
              </Button>
            </NextLink>

            <NextLink href="/about" passHref>
              <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
                My Items
              </Button>
            </NextLink>

            <NextLink href="/contact" passHref>
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                My Purchases
              </Button>
            </NextLink>
          </Flex>
          <Flex align="center">
            {account ? (
              <Button
                as="a"
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
              >
                {account.slice(0, 5) + "..." + account.slice(38, 42)}
              </Button>
            ) : (
              <Button
                variant="ghost"
                aria-label="Contact"
                my={5}
                w="100%"
                onClick={handler}
              >
                Connect wallet
              </Button>
            )}
          </Flex>
        </Flex>

        {/* Mobile */}
        {!isOpen && (
          <IconButton
            aria-label="Open Menu"
            size="lg"
            mr={2}
            icon={<HamburgerIcon />}
            onClick={() => {
              setIsOpen(true);
              changeDisplay("flex");
            }}
            display={["flex", "flex", "none", "none"]}
          />
        )}
      </Flex>

      {/* Mobile Content */}
      <Flex
        w="100vw"
        display={display}
        bgColor="gray.50"
        zIndex={20}
        h="100vh"
        top="0"
        left="0"
        overflowY="auto"
        flexDir="column"
      >
        <Flex justify="flex-end">
          <IconButton
            mt={4}
            mr={5}
            aria-label="Open Menu"
            size="lg"
            icon={<CloseIcon />}
            onClick={() => {
              setIsOpen(false);
              changeDisplay("none");
            }}
          />
        </Flex>

        <Flex flexDir="column" align="center">
          <NextLink href="/" passHref>
            <Image src="/logo.png" width={100} height={100} alt="logo" />
          </NextLink>

          <NextLink href="/" passHref>
            <Button as="a" variant="ghost" aria-label="Home" my={5} w="100%">
              Create
            </Button>
          </NextLink>

          <NextLink href="/about" passHref>
            <Button as="a" variant="ghost" aria-label="About" my={5} w="100%">
              My Items
            </Button>
          </NextLink>

          <NextLink href="/contact" passHref>
            <Button as="a" variant="ghost" aria-label="Contact" my={5} w="100%">
              My Purchases
            </Button>
          </NextLink>
        </Flex>
      </Flex>
    </Flex>
  );
};
