import {
  Box,
  Card,
  CardBody,
  CardFooter,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Trash } from "react-feather";
import QuantityInput from "../generics/numInput";
import { API_URL } from "@/utils/constants";
import { useDispatch } from "react-redux";
import { updateCart } from "@/redux/features/cart-slice";
import { useState } from "react";
import { useMemo } from "react";
const CartProductCard = ({
  name,
  itemId,
  image,
  price,
  quantity,
  token,
  stock,
}) => {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const updateQuantity = useMemo(() => setQty(quantity), [quantity]);
  const toast = useToast();
  const handleRemoveFromCart = async () => {
    try {
      const response = await fetch(API_URL + "/remove-from-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart_item_id: itemId }),
      });
      const { message, data } = await response.json();
      if (response.ok) {
        dispatch(updateCart(data));
        toast({
          title: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "removing from cart failed",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "removing from cart failed",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleUpdateCartItemQuantity = async (quantity) => {
    try {
      const response = await fetch(API_URL + "/update-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cart_item_id: itemId, quantity }),
      });
      const { message, data } = await response.json();
      if (response.ok) {
        dispatch(updateCart(data));
        toast({
          title: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "updating cart failed",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "updating cart failed",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <>
      <Card overflow="hidden" variant="outline">
        <Stack
          justifyContent={"space-between"}
          w={"100%"}
          direction={{ base: "column", sm: "row" }}
          alignItems={"center"}
        >
          <CardBody
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
            alignItems={"center"}
            gap={4}
          >
            <Image
              src={image}
              objectFit="cover"
              maxW={{ base: "100%", sm: "150px" }}
              p={5}
            />
            <Box>
              <Heading size="md">{name}</Heading>
            </Box>
          </CardBody>

          <CardFooter
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Heading size={"md"} textAlign={"center"}>
              ${price}
            </Heading>
            <HStack justifyContent={"center"} alignItems={"flex-end"}>
              <IconButton
                icon={<Icon as={Trash} />}
                bg={"bonus.500"}
                size={"sm"}
                color={"primary.100"}
                onClick={handleRemoveFromCart}
              />
              {qty ? (
                <QuantityInput
                  value={qty}
                  precision={0}
                  step={1}
                  min={1}
                  max={stock}
                  onIncrement={() => {
                    if (qty !== stock) setQty(qty + 1);
                  }}
                  onDecrement={() => {
                    if (qty !== 1) setQty(qty - 1);
                  }}
                  onChange={(qty) => setQty(qty)}
                  onBlur={() => {
                    handleUpdateCartItemQuantity(qty);
                  }}
                  flex={1}
                  width="100%"
                />
              ) : null}
            </HStack>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default CartProductCard;
