"use client";
import {
  Box,
  Button,
  Heading,
  Icon,
  Stack,
  Select,
  Flex,
  SimpleGrid,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  useDisclosure,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import CardSkeleton from "@/components/generics/cardSkeleton";
import Card from "@/components/products/card";
import { ChevronDown, Filter, Search } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import PriceInput from "@/components/generics/numInput";
import React, { useEffect, useState } from "react";
import { API_URL } from "@/utils/constants";
import { updateFilter } from "@/redux/features/filter-slice";
function generateUrlParams(obj) {
  const params = [];

  for (const [key, value] of Object.entries(obj)) {
    if (value !== null && value !== undefined && value !== "") {
      params.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
  }
  return params.join("&");
}
const Products = () => {
  const [filter, setFilter] = useState({
    "brand_id[]": "",
    "category_id[]": "",
    min_price: null,
    max_price: null,
    name: null,
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const dispatch = useDispatch();
  const { products, isLoading, categories, brands } = useSelector(
    (state) => state.filterReducer.value
  );
  async function handleFilter(options) {
    const params = generateUrlParams(options);
    const res = await fetch(API_URL + `/products-filter?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { data } = await res.json();
    const items = data.products;
    return dispatch(updateFilter(items));
  }
  return (
    <>
      <Box textAlign={"center"} mb={5}>
        <Button
          ref={btnRef}
          color="primary.100"
          onClick={onOpen}
          leftIcon={<Icon as={Filter} />}
        >
          Filter
        </Button>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Products</DrawerHeader>

          <DrawerBody>
            <Flex direction={"column"} gap={5}>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={Search} color="gray.500" />}
                />
                <Input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      name: e.target.value,
                    })
                  }
                />
              </InputGroup>
              <Stack></Stack>
              <Stack>
                <Heading size={"sm"}>Brand:</Heading>
                <Select
                  icon={<Icon as={ChevronDown} />}
                  size={"sm"}
                  borderColor={"primary.500"}
                  flex={1}
                  width="100%"
                  value={filter["brand_id[]"]}
                  borderRadius={10}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      "brand_id[]": e.target.value,
                    })
                  }
                >
                  <Box as={"option"} color={"secondary.900"} value="" hidden>
                    Select brand
                  </Box>
                  {brands?.map((brand) => (
                    <Box
                      as={"option"}
                      color={"secondary.900"}
                      value={brand.id}
                      key={brand.id}
                    >
                      {brand.name}
                    </Box>
                  ))}
                </Select>
              </Stack>
              <Stack flex={1}>
                <Heading size={"sm"}>Category:</Heading>
                <Select
                  icon={<Icon as={ChevronDown} />}
                  borderColor={"primary.500"}
                  size={"sm"}
                  flex={1}
                  width="100%"
                  value={filter["category_id[]"]}
                  borderRadius={10}
                  onChange={(e) =>
                    setFilter({
                      ...filter,
                      "category_id[]": e.target.value,
                    })
                  }
                >
                  <Box as={"option"} color={"secondary.900"} value="" hidden>
                    Select Category
                  </Box>
                  {categories?.map((category) => (
                    <Box
                      as={"option"}
                      color={"secondary.900"}
                      value={category.id}
                      key={category.id}
                    >
                      {category.name}
                    </Box>
                  ))}
                </Select>
              </Stack>
              <PriceInput
                label="Min price:"
                value={filter.min_price}
                precision={2}
                step={1}
                min={1}
                max={Number.POSITIVE_INFINITY}
                onIncrement={() =>
                  setFilter({
                    ...filter,
                    min_price: filter.min_price + 1 || 1,
                  })
                }
                onDecrement={() =>
                  setFilter({
                    ...filter,
                    min_price: filter.min_price - 1 || 1,
                  })
                }
                onChange={(newValue) =>
                  setFilter({ ...filter, min_price: newValue })
                }
                onBlur={() => {}}
                flex={1}
                width="100%"
              />

              <PriceInput
                label="Max price:"
                value={filter.max_price}
                precision={2}
                step={1}
                min={1}
                max={Number.POSITIVE_INFINITY}
                onIncrement={() =>
                  setFilter({
                    ...filter,
                    max_price: filter.max_price + 1 || 1,
                  })
                }
                onDecrement={() =>
                  setFilter({
                    ...filter,
                    max_price: filter.max_price - 1 || 1,
                  })
                }
                onChange={(newValue) =>
                  setFilter({ ...filter, max_price: newValue })
                }
                onBlur={() => {}}
                flex={1}
                width="100%"
              />
            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button
              variant={"outline"}
              borderColor={"primary.500"}
              onClick={() => {
                setFilter({
                  "brand_id[]": "",
                  "category_id[]": "",
                  min_price: null,
                  max_price: null,
                  name: null,
                });
                handleFilter({
                  "brand_id[]": "",
                  "category_id[]": "",
                  min_price: null,
                  max_price: null,
                  name: null,
                });
                onClose();
              }}
              mr={3}
            >
              reset
            </Button>
            <Button
              color={"primary.100"}
              onClick={() => {
                handleFilter(filter);
                onClose();
              }}
            >
              Filter
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <SimpleGrid
        columns={{ base: 2, md: 3, lg: 4 }}
        spacing={5}
        mb={"5rem"}
        justifyItems={{ base: "", md: "center" }}
      >
        {isLoading
          ? Array.from({ length: 12 }).map((_, index) => (
              <Box key={index} display={"flex"} maxW={"3xs"}>
                <CardSkeleton />
              </Box>
            ))
          : products?.map((product) => (
              <Box key={product.id} maxW={"xs"}>
                <Card
                  title={product.name}
                  image={product.image}
                  brand={product.brand}
                  description={product.description}
                  price={product.price}
                  id={product.id}
                  discount={product.discount}
                />
              </Box>
            ))}
      </SimpleGrid>
    </>
  );
};

export default Products;
