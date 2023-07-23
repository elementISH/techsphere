import { updateCart } from "@/redux/features/cart-slice";
import { updateFavorites } from "@/redux/features/favorites-slice";
import { API_URL } from "@/utils/constants";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  Divider,
  Card,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Heart, ShoppingCart } from "react-feather";
import { useDispatch, useSelector } from "react-redux";

const ProductCard = ({ title, description, brand, price, image, id }) => {
  const favoriteIds = useSelector(
    (state) => state.favoritesReducer.value.favoriteIds
  );

  const dispatch = useDispatch();
  const token = useSelector((state) => state.authReducer.value.token);
  const fill = useMemo(() => favoriteIds.includes(id), [favoriteIds]);
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
    <>
      <Box
        maxW={"2xs"}
        bg="primary.100"
        display={"flex"}
        flexDirection={"column"}
        border="1px solid"
        borderColor="secondary.300"
        borderRadius={30}
        flex={1}
      >
        <Link href={`/products/${id}`}>
          <Box flex={1}>
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
          <Flex p={5} justifyContent={"space-between"} direction={"row"}>
            <Stack>
              <Heading color="primary.500" size={["sm", "md"]}>
                <Link href={`/products/${id}`}>{title}</Link>
              </Heading>
              <Text color="secondary.300">{brand}</Text>
            </Stack>
            <Heading size={["sm", "md"]}>${price}</Heading>
          </Flex>

          <Text flexShrink={0} noOfLines={3} px={5}>
            {description}
          </Text>
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
                      onClick={handleFavoriteToggle}
                    />
                  }
                  bg={"transparent"}
                />
              </ButtonGroup>
            </ButtonGroup>
          </Stack>
        </Box>
      </Box>
    </>
  );
};

export default ProductCard;
