import { addToCart, updateCart } from "@/redux/features/cart-slice";
import { updateFavorites } from "@/redux/features/favorites-slice";
import { API_URL } from "@/utils/constants";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Heart, ShoppingCart } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

const Card = ({ image, id, title, price, discount }) => {
  const favoriteIds = useSelector(
    (state) => state.favoritesReducer.value.favoriteIds
  );

  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.value.token);
  const fill = useMemo(() => favoriteIds.includes(+id), [favoriteIds]);
  const toast = useToast();
  const addFavorite = async () => {
    try {
      const response = await fetch(API_URL + "/add-to-wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: id }),
      });
      const { message, data } = await response.json();
      if (response.ok) {
        dispatch(
          updateFavorites({
            items: data,
            favoriteIds: data?.map((item) => item.id),
          })
        );
        toast({
          title: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "adding to favorites failed",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "adding to favorites failed",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const removeFavorite = async () => {
    try {
      const response = await fetch(API_URL + "/remove-from-wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: id }),
      });
      const { message, data } = await response.json();
      if (response.ok) {
        dispatch(
          updateFavorites({
            items: data,
            favoriteIds: data?.map((item) => item.id),
          })
        );
        toast({
          title: message,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "removing from favorites failed",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "removing from favorites failed",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  const handleFavoriteToggle = () => {
    switch (fill) {
      case true:
        removeFavorite();
        break;

      default:
        addFavorite();
        break;
    }
  };
  const handleAddToCart = async () => {
    try {
      const response = await fetch(API_URL + "/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: id }),
      });
      const { message, data } = await response.json();
      if (response.ok) {
        dispatch(updateCart(data));
        toast({
          title: message,
          status: "success",
          position: "top-right",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "adding to cart failed",
          description: message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "adding to cart failed",
        description: "Please try again later",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  return (
    <Box
      maxW={"250px"}
      bg="primary.100"
      display={"flex"}
      flexDirection={"column"}
      border="1px solid"
      borderColor="secondary.300"
      borderRadius={30}
    >
      <Link href={`/products/${id}`} style={{ position: "relative" }}>
        {discount > 0 ? (
          <Badge
            colorScheme="red"
            position={"absolute"}
            right={0}
            w={"50px"}
            textAlign={"center"}
            top={"1rem"}
            transform={"rotate(45deg)"}
          >
            {discount}%
          </Badge>
        ) : null}
        <Box flex={1} position={"relative"}>
          <Flex
            alignItems={"center"}
            justifyContent={"center"}
            p={5}
            h={"100%"}
          >
            <Image src={image} flexShrink={0} w={"50%"} />
          </Flex>
        </Box>
      </Link>
      <Divider />
      <Box>
        <Stack p={5} spacing={5}>
          <Heading color="primary.500" size={["sm", "md"]}>
            <Link href={`/products/${id}`}>{title}</Link>
          </Heading>
          <Flex justifyContent={"space-between"} fontSize={["sm", "xl"]}>
            <Text fontWeight={"bold"}>${price}</Text>
          </Flex>
        </Stack>
        <Divider />
        <Stack p={5}>
          <ButtonGroup
            as={Flex}
            justifyContent={"space-between"}
            alignItems={"center"}
            alignContent={"center"}
          >
            <Button
              borderColor="primary.500"
              variant="outline"
              fontSize={"sm"}
              fontWeight={["bold"]}
              leftIcon={<Icon as={ShoppingCart} />}
              size={"sm"}
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
            <ButtonGroup>
              <IconButton
                icon={
                  <Icon
                    as={Heart}
                    fontSize={"24px"}
                    fill={fill ? "bonus.500" : "none"}
                  />
                }
                bg={"transparent"}
                onClick={handleFavoriteToggle}
              />
            </ButtonGroup>
          </ButtonGroup>
        </Stack>
      </Box>
    </Box>
  );
};

export default Card;
