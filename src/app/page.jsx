"use client";
import React, { useEffect } from "react";
import Banner from "@/components/home/banner";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Card from "@/components/generics/card";
import Statement from "@/components/generics/statement";
import { Box, Button, Flex, Skeleton } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import Link from "next/link";
import CardSkeleton from "@/components/generics/cardSkeleton";
function ArrowStyle() {
  const arrowStyle = `
    .splide__arrows{
      display: flex;
      position: absolute;
      top: -2.5rem;
      right: 0;
      gap: 10px;
    }
    .splide__arrow {
      position: unset;
      background: none;
      border: 1px solid #008ECC;
    }
    .splide__arrow svg{
      fill: #313131;
    }
    @media (max-width: 590px) {
    .splide__arrows {
      top: unset;
      right: unset;
      bottom: -3.5rem;
      left: 50%;
      transform: translate(-50%, 1rem);
      margin-bottom: 10px;
    }
}
  `;
  return <style>{arrowStyle}</style>;
}

const Home = () => {
  const { products, isLoading } = useSelector(
    (state) => state.productsReducer.value
  );

  const [perView, setPerView] = React.useState("5");

  React.useEffect(() => {
    function handleResize() {
      const viewportWidth = window.innerWidth;
      if (viewportWidth >= 1024) {
        setPerView("4");
      } else if (viewportWidth >= 768) {
        setPerView("3");
      } else if (viewportWidth >= 640) {
        setPerView("2");
      } else {
        setPerView("1");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <ArrowStyle />
      <Banner />
      <Box mb={"4rem"}>
        <Statement
          statement={"Browse the best deals for Apple laptops now"}
          emtext={"Apple laptops"}
          size={"md"}
        />
        <Box className="wrapper">
          {isLoading ? (
            <Flex justifyContent={"space-between"} gap={"1rem"}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Box as={SplideSlide} key={index} display={"flex"}>
                  <CardSkeleton />
                </Box>
              ))}
            </Flex>
          ) : (
            <Splide
              options={{
                perMove: 1,
                perPage: perView,
                rewind: true,
                gap: "1rem",
                pagination: false,
                autoWidth: true,
              }}
            >
              {products?.map((product) => (
                <Box as={SplideSlide} key={product.id} display={"flex"}>
                  <Card
                    image={product.image}
                    title={product.name}
                    price={product.price}
                    id={product.id}
                    discount={product.discount}
                  />
                </Box>
              ))}
            </Splide>
          )}
        </Box>
      </Box>
      <Box mb={"4rem"}>
        <Statement
          statement={"Browse the best deals for Apple laptops now"}
          emtext={"Apple laptops"}
          size={"md"}
        />
        <Box className="wrapper">
          {isLoading ? (
            <Flex justifyContent={"space-between"} gap={"1rem"}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Box as={SplideSlide} key={index} display={"flex"}>
                  <CardSkeleton />
                </Box>
              ))}
            </Flex>
          ) : (
            <Splide
              options={{
                perMove: 1,
                perPage: perView,
                rewind: true,
                gap: "1rem",
                pagination: false,
                autoWidth: true,
              }}
            >
              {products?.map((product) => (
                <Box as={SplideSlide} key={product.id} display={"flex"}>
                  <Card
                    image={product.image}
                    title={product.name}
                    price={product.price}
                    id={product.id}
                    discount={product.discount}
                  />
                </Box>
              ))}
            </Splide>
          )}
        </Box>
      </Box>
      <Flex justifyContent={"center"} my={10}>
        <Button
          borderColor="primary.500"
          variant="outline"
          fontSize={["sm"]}
          fontWeight={["bold"]}
          as={Link}
          href={"/products"}
        >
          Browse More Products
        </Button>
      </Flex>
    </>
  );
};
export default Home;
