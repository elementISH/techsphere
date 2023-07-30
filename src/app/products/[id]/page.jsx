"use client";

import {
  Button,
  ButtonGroup,
  Divider,
  Flex,
  Heading,
  Icon,
  IconButton,
  ListItem,
  Skeleton,
  Stack,
  Text,
  UnorderedList,
  useToast,
} from "@chakra-ui/react";
import Carousel from "@/components/products/productDetails/carousel";
import React, { useEffect, useMemo, useState } from "react";
import SimilarProducts from "@/components/products/productDetails/similarProducts";
import { Heart, ShoppingCart } from "react-feather";
import getDetails from "@/utils/functions/getDetails";
import { API_URL } from "@/utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateFavorites } from "@/redux/features/favorites-slice";
import { updateCart } from "@/redux/features/cart-slice";

function Details({ params: { id } }) {
  const favoriteIds = useSelector(
    (state) => state.favoritesReducer.value.favoriteIds
  );
  const fill = useMemo(() => favoriteIds.includes(+id), [favoriteIds]);
  const [details, setDetails] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer.value);
  useEffect(() => {
    async function fetchData() {
      const res = await getDetails(id);
      const { data } = res;
      setDetails(data);
    }
    fetchData();
  }, []);
  if (!details) {
    return (
      <Stack p={5} bg={"primary.100"} borderRadius={10} mb={"5rem"} gap={10}>
        <Skeleton height="200px" />
        {/* <Skeleton height="16px" /> */}
        <Skeleton height="2px" />
        <Skeleton height="30px" />
        <Skeleton height="100px" />
      </Stack>
    );
  }
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
    <>
      <Stack
        p={5}
        bg={"primary.100"}
        borderRadius={10}
        direction={"column-reverse"}
        mb={"5rem"}
        gap={10}
      >
        <Stack spacing={5}>
          <Stack spacing={2}>
            <Heading size={"md"}>{details.name}</Heading>
            <Heading size={"sm"}>${details.price}</Heading>
            <Text>{details.description}</Text>
          </Stack>
          <Stack>
            <Heading size={"md"}>More Details:</Heading>
            <UnorderedList ps={2}>
              <ListItem>Stock: {details.stock}</ListItem>
              <ListItem>Brand: {details.brand}</ListItem>
              <ListItem>Category: {details.category}</ListItem>
            </UnorderedList>
          </Stack>
          <Stack>
            <ButtonGroup
              as={Flex}
              alignItems={"center"}
              alignContent={"center"}
            >
              <Button
                borderColor="primary.500"
                fontSize={"md"}
                color={"primary.100"}
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
        </Stack>
        <Divider />
        <Stack justifyContent={"end"} alignItems={"end"}>
          <Carousel images={details.product_images} image={details.image} />
        </Stack>
      </Stack>
      <SimilarProducts />
    </>
  );
}
export default Details;
