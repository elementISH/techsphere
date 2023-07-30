import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Input,
  Stack,
  Text,
  useNumberInput,
} from "@chakra-ui/react";
import Link from "next/link";
import { Trash } from "react-feather";

const CartPriceCard = ({ total }) => {
  return (
    <>
      <Box spacing={1}>
        <Flex direction={"column"} gap={5}>
          {/* <Flex direction={"row"} justifyContent={"space-between"} p={3}>
            <Heading size={"sm"}>sub-total</Heading>
            <Heading size={"sm"}>$799</Heading>
          </Flex>
          <Divider />
          <Flex direction={"row"} justifyContent={"space-between"} p={3}>
            <Heading size={"sm"}>shipping</Heading>
            <Heading size={"sm"}>$15</Heading>
          </Flex> */}
          <Divider />

          <Flex direction={"row"} justifyContent={"space-between"} p={3}>
            <Heading size={"sm"}>total</Heading>
            <Heading size={"sm"}>${total}</Heading>
          </Flex>
        </Flex>
        <Divider my={5} />
        <ButtonGroup>
          <Button
            as={Link}
            href="/checkout"
            variant={"styled"}
            bg={"primary.500"}
            color={"primary.100"}
          >
            checkout
          </Button>
          <Button
            as={Link}
            href="/products"
            variant={"outline"}
            borderColor={"primary.500"}
          >
            continue shopping
          </Button>
        </ButtonGroup>
      </Box>
    </>
  );
};

export default CartPriceCard;
