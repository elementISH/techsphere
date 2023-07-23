"use client";
import { Box, Divider, Heading, Stack } from "@chakra-ui/react";
import Card from "@/components/cart/card";
import PriceCard from "@/components/cart/priceCard";
import { useSelector } from "react-redux";
import UnAuth from "@/components/cart/unauthenticated";
import { useMemo } from "react";
const Cart = ({ user, token }) => {
  const { cart_items, id, total } =
    useSelector((state) => state.cartReducer.value.cart) || [];
  const products = useMemo(() => cart_items, [cart_items]);
  return (
    <>
      {products?.length == 0 ? (
        <Heading textAlign={"center"}>cart is empty</Heading>
      ) : (
        <Box bg="primary.100" borderRadius={10} p={5} mb={"5rem"}>
          <Stack>
            <Heading size={"md"}>Order: {id}</Heading>
            <Divider />
            {products?.map((item) => (
              <Card
                key={item.item_id}
                itemId={item.item_id}
                name={item.item_product_name}
                image={item.item_product_image}
                price={item.item_product_price}
                quantity={item.item_quantity}
                token={token}
              />
            ))}
            <Divider />
            <Box>
              <PriceCard total={total} />
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
};

const AuthCart = () => {
  const { user, isAuth, token } = useSelector(
    (state) => state.authReducer.value
  );

  if (!isAuth) {
    return <UnAuth />;
  }

  return <Cart user={user} token={token} />;
};
export default AuthCart;