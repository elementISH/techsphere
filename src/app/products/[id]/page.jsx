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
} from "@chakra-ui/react";
import Carousel from "@/components/products/productDetails/carousel";
import React, { useEffect, useState } from "react";
import SimilarProducts from "@/components/products/productDetails/similarProducts";
import { Heart, ShoppingCart } from "react-feather";
import getDetails from "@/utils/functions/getDetails";

function Details({ params: { id } }) {
  const [fill, setFill] = useState(false);
  const [details, setDetails] = useState(null);

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
  const handleFavoriteToggle = () => {
    setFill(!fill);
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
