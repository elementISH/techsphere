"use client";
import {
  Box,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import Card from "@/components/checkout/card";
import PriceCard from "@/components/checkout/priceCard";
import Form from "@/components/checkout/form";
import { useSelector } from "react-redux";
import UnAuth from "@/components/checkout/unauthenticated";
const Checkout = ({ user, token, isVerified }) => {
  const { cart_items, id, total } =
    useSelector((state) => state.cartReducer.value.cart) || [];
  return (
    <>
      <Box
        mb={"5rem"}
        display={"flex"}
        gap={10}
        justifyContent={"space-between"}
        flexDirection={{ base: "column-reverse", md: "row" }}
      >
        <Form user={user} token={token} id={id} isVerified={isVerified} />

        <Stack bg={"primary.100"} borderRadius={10} p={5} maxW={"md"}>
          <Heading size={"md"}>Order: {id}</Heading>
          <Divider />
          <SimpleGrid columns={3} gap={2}>
            {cart_items?.map((item) => (
              <Card
                key={item.item_id}
                name={item.item_product_name}
                image={item.item_product_image}
              />
            ))}
          </SimpleGrid>
          <Divider />
          <Box>
            <PriceCard total={total} />
          </Box>
        </Stack>
      </Box>
    </>
  );
};
const AuthCheckout = () => {
  const { user, isAuth, token, isVerified } = useSelector(
    (state) => state.authReducer.value
  );

  if (!isAuth) {
    return <UnAuth />;
  }

  return <Checkout user={user} token={token} isVerified={isVerified} />;
};

export default AuthCheckout;
