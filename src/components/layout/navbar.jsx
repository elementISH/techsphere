import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  useDisclosure,
  Icon,
  Divider,
  Container,
  Image,
  Avatar,
  AvatarBadge,
  Popover,
  PopoverTrigger,
  ButtonGroup,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  useToast,
} from "@chakra-ui/react";
import { Menu, X, User, ShoppingCart, Search } from "react-feather";
import AuthModal from "../generics/authModal";
import * as companyData from "@/utils/constants";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { logOut } from "@/redux/features/auth-slice";
import { resetCart } from "@/redux/features/cart-slice";
import { resetHistory } from "@/redux/features/history-slice";
import { resetFavorites } from "@/redux/features/favorites-slice";
const Navbar = () => {
  const dispatch = useDispatch();
  const toast = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isOpen, onToggle } = useDisclosure();
  const {
    isOpen: isModalOpen,
    onOpen: onModalOpen,
    onClose: onModalClose,
  } = useDisclosure();
  const data = useSelector((state) => state.authReducer.value);
  const { isAuth, token } = data;
  const { name, image } = data.user;
  const handleLogOut = () => {
    fetch(companyData.API_URL + "/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const { message } = result;
        dispatch(logOut());
        dispatch(resetFavorites());
        dispatch(resetCart());
        dispatch(resetHistory());
        toast({
          title: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((error) => {
        toast({
          title: "failed to log out",
          description: "Please try again later",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <>
      <Box as={"nav"} position={"sticky"} top={0} zIndex={100}>
        <Flex
          bg="primary.200"
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: "20px" }}
          align={"center"}
        >
          <Flex
            flex={{ base: 1, md: "auto" }}
            ml={{ base: -2 }}
            display={{ base: "flex", md: "none" }}
          >
            <IconButton
              onClick={onToggle}
              icon={isOpen ? <Icon as={X} /> : <Icon as={Menu} />}
              variant={"ghost"}
              aria-label={"Toggle Navigation"}
            />
          </Flex>
          <Container
            maxW={"container.xl"}
            display={"flex"}
            alignItems={"center"}
            alignContent={"center"}
          >
            <Flex flex={{ base: 1 }} justify={{ base: "end", md: "start" }}>
              <Text
                display={"flex"}
                alignItems={"center"}
                fontFamily={"heading"}
                color="primary.500"
                fontWeight={"bold"}
              >
                <Image src={companyData.COMPANY_LOGO_URL} h={5} mr={2} />
                {companyData.COMPANY_NAME}
              </Text>

              <Flex display={{ base: "none", md: "flex" }} ml={10}>
                <DesktopNav />
              </Flex>

              <Stack
                flex={{ base: 1, md: 0 }}
                justify={"flex-end"}
                direction={"row"}
                spacing={6}
                display={{ base: "flex", md: "none" }}
              >
                {isAuth ? (
                  <Popover>
                    <PopoverTrigger>
                      <Flex alignItems={"center"} cursor={"pointer"}>
                        <Avatar src={image} size={"sm"}>
                          <AvatarBadge boxSize="1.25em" bg="green.500" />
                        </Avatar>
                        <Box ml="3">
                          <Text fontWeight="bold" w={"max-content"}>
                            {name}
                          </Text>
                        </Box>
                      </Flex>
                    </PopoverTrigger>
                    <PopoverContent
                      alignItems={"center"}
                      maxW={"10rem"}
                      _focusVisible={{
                        outline: "0",
                      }}
                    >
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Actions</PopoverHeader>
                      <PopoverBody>
                        <ButtonGroup size="sm" flexDirection={"column"} gap={5}>
                          <Button variant="link" as={Link} href={"/profile"}>
                            Profile
                          </Button>
                          <Button variant="link" onClick={handleLogOut}>
                            Logout
                          </Button>
                        </ButtonGroup>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Button
                    fontSize={"sm"}
                    fontWeight={400}
                    variant={"link"}
                    onClick={onModalOpen}
                    leftIcon={
                      <Icon as={User} color="primary.500" w={5} h={5} />
                    }
                  >
                    Login
                  </Button>
                )}
              </Stack>
            </Flex>

            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={6}
              display={{ base: "none", md: "flex" }}
            >
              {isAuth ? (
                <>
                  <Popover>
                    <PopoverTrigger>
                      <Flex alignItems={"center"} w={"full"} cursor={"pointer"}>
                        <Avatar src={image} size={"sm"}>
                          <AvatarBadge boxSize="1.25em" bg="green.500" />
                        </Avatar>
                        <Box ml="3">
                          <Text fontWeight="bold" w={"max-content"}>
                            {name}
                          </Text>
                        </Box>
                      </Flex>
                    </PopoverTrigger>
                    <PopoverContent
                      alignItems={"center"}
                      maxW={"10rem"}
                      _focusVisible={{
                        outline: "0",
                      }}
                    >
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Actions</PopoverHeader>
                      <PopoverBody>
                        <ButtonGroup size="sm" flexDirection={"column"} gap={5}>
                          <Button variant="link" as={Link} href={"/profile"}>
                            Profile
                          </Button>
                          <Button variant="link" onClick={handleLogOut}>
                            Logout
                          </Button>
                        </ButtonGroup>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </>
              ) : (
                <Button
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  onClick={onModalOpen}
                  leftIcon={<Icon as={User} color="primary.500" w={5} h={5} />}
                >
                  Login
                </Button>
              )}
              {isAuth ? (
                <Button
                  as={Link}
                  fontSize={"sm"}
                  fontWeight={400}
                  variant={"link"}
                  href={"/cart"}
                  leftIcon={
                    <Icon as={ShoppingCart} color="primary.500" w={5} h={5} />
                  }
                >
                  Cart
                </Button>
              ) : null}
            </Stack>
          </Container>
        </Flex>

        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
        <Divider border={"2px"} borderColor="gray.200" />
      </Box>

      <AuthModal isOpen={isModalOpen} onClose={onModalClose} />
    </>
  );
};

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={4}>
      <Button
        as={Link}
        href="/"
        fontSize={"sm"}
        fontWeight={400}
        variant={"link"}
      >
        Home
      </Button>
      <Button
        as={Link}
        href="/faq"
        fontSize={"sm"}
        fontWeight={400}
        variant={"link"}
      >
        FAQ
      </Button>
      <Button
        as={Link}
        href="/products"
        fontSize={"sm"}
        fontWeight={400}
        variant={"link"}
      >
        Products
      </Button>
      <Button
        as={Link}
        href="/contact"
        fontSize={"sm"}
        fontWeight={400}
        variant={"link"}
      >
        Contact
      </Button>
    </Stack>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg="primary.200"
      display={{ base: "flex", md: "none" }}
      alignItems={"center"}
      justifyContent={"center"}
      alignContent={"center"}
      direction={"row"}
      spacing={5}
    >
      <Button as={Link} w="fit-content" href="/" variant="ghost" p="0">
        Home
      </Button>
      <Button as={Link} w="fit-content" href="/faq" variant="ghost" p="0">
        FAQ
      </Button>
      <Button as={Link} w="fit-content" href="/products" variant="ghost" p="0">
        Products
      </Button>
      <Button as={Link} w="fit-content" href="/contact" variant="ghost" p="0">
        Contact
      </Button>
    </Stack>
  );
};

export default Navbar;
