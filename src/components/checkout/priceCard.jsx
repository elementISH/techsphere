import { Box, Flex, Heading } from "@chakra-ui/react";

const CheckoutPriceCard = ({ total }) => {
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
          {/* <Divider /> */}

          <Flex direction={"row"} justifyContent={"space-between"} p={3}>
            <Heading size={"sm"}>total</Heading>
            <Heading size={"sm"}>${total}</Heading>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};

export default CheckoutPriceCard;
