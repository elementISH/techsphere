import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Facebook, Instagram, Linkedin, Twitter } from "react-feather";
import Link from "next/link";
const Footer = () => {
  return (
    <Flex
      as={"footer"}
      bg="primary.900"
      color="white"
      py={6}
      px={"20px"}
      justifyContent={{ base: "center", md: "space-between" }}
      direction={{ base: "column", md: "row" }}
      gap={{ base: 4, md: 0 }}
    >
      <Stack w={"fit-content"} spacing={5} maxW={"100%"}>
        <Heading size="md" color="bonus.100" w={"max-content"}>
          About us
        </Heading>
        <Stack direction={"column"} spacing={5}>
          <Text noOfLines={3} w={"50ch"} maxW={"100%"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consectetur, quam vitae labore iste quasi culpa, nemo nisi, quidem
            nostrum eaque porro qui! Dolorem nobis rerum dicta non minima hic
            officiis.
          </Text>
          <Flex gap={5} direction={{ base: "column-reverse", md: "row" }}>
            <Flex gap={5}>
              <Icon as={Instagram} w={5} h={5} />
              <Icon as={Linkedin} w={5} h={5} />
              <Icon as={Facebook} w={5} h={5} />
              <Icon as={Twitter} w={5} h={5} />
            </Flex>
            <Flex gap={3}>
              <Button
                as={Link}
                variant={"link"}
                href={"/privacy"}
                fontSize={"xs"}
                textDecoration={"underline"}
              >
                privacy policy
              </Button>
              <Button
                as={Link}
                variant={"link"}
                href={"/terms"}
                fontSize={"xs"}
                textDecoration={"underline"}
              >
                terms & conditions
              </Button>
            </Flex>
          </Flex>
        </Stack>
      </Stack>
      <Stack w={"fit-content"} spacing={5}>
        <Heading size="md" color="bonus.100" w={"max-content"}>
          Quick Links
        </Heading>
        <Flex
          direction={{ base: "row", md: "column" }}
          gap={3}
          alignItems={"flex-start"}
        >
          <Button
            as={Link}
            fontSize={"sm"}
            color="secondary.100"
            fontWeight={400}
            href={"/"}
            variant={"link"}
            display={"block"}
          >
            Home
          </Button>
          <Button
            as={Link}
            fontSize={"sm"}
            color="secondary.100"
            fontWeight={400}
            href={"/faq"}
            variant={"link"}
            display={"block"}
          >
            FAQ
          </Button>
          <Button
            as={Link}
            fontSize={"sm"}
            color="secondary.100"
            fontWeight={400}
            href={"/products"}
            variant={"link"}
            display={"block"}
          >
            Products
          </Button>
          <Button
            as={Link}
            fontSize={"sm"}
            color="secondary.100"
            fontWeight={400}
            href={"contact"}
            variant={"link"}
            display={"block"}
          >
            Contact
          </Button>
        </Flex>
      </Stack>
      <Stack spacing={5} w={"fit-content"}>
        <Heading size="md" color="bonus.100" w={"max-content"}>
          Quick Actions
        </Heading>
        <Flex
          direction={{ base: "row", md: "column" }}
          gap={3}
          alignItems={"flex-start"}
        >
          <Button
            as={Link}
            fontSize={"sm"}
            color="secondary.100"
            fontWeight={400}
            href={"/profile?tab=0"}
            variant={"link"}
            display={"block"}
          >
            Settings
          </Button>
          <Button
            as={Link}
            fontSize={"sm"}
            color="secondary.100"
            fontWeight={400}
            href={"/profile?tab=1"}
            variant={"link"}
            display={"block"}
          >
            Order History
          </Button>
          <Button
            as={Link}
            fontSize={"sm"}
            color="secondary.100"
            fontWeight={400}
            href={"/profile?tab=2"}
            variant={"link"}
            display={"block"}
          >
            Favorite
          </Button>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Footer;
