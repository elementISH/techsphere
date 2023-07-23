"use client";
import React from "react";
import {
  Container,
  Heading,
  Stack,
  Text,
  Image,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { useSelector } from "react-redux";

const Banner = () => {
  const { images, isLoading } = useSelector(
    (state) => state.sliderReducer.value
  );
  const [sliderWidth, setSliderWidth] = React.useState("25rem");
  const [sliderHeight, setSliderHeight] = React.useState("15rem");

  React.useEffect(() => {
    function handleResize() {
      const viewportWidth = window.innerWidth;
      if (viewportWidth >= 1024) {
        setSliderWidth("30rem");
        setSliderHeight("10rem");
      } else if (viewportWidth >= 768) {
        setSliderWidth("25rem");
        setSliderHeight("8rem");
      } else if (viewportWidth >= 640) {
        setSliderWidth("25rem");
        setSliderHeight("8rem");
      } else {
        setSliderWidth("25rem");
        setSliderHeight("8rem");
      }
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const options = {
    type: "loop",
    drag: false,
    autoplay: true,
    interval: 4000,
    pauseOnHover: false,
    height: sliderHeight,
    width: sliderWidth,
    arrows: false,
    paginationDirection: "ttb",
    direction: "ttb",
  };

  return (
    <>
      <Container
        maxW="full"
        bg="primary.800"
        borderRadius={25}
        px={10}
        py={4}
        color="secondary.100"
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        alignContent={"center"}
        flexDirection={{ base: "column", md: "row" }}
        gap={{ base: "10", md: "0" }}
        mb={10}
      >
        <Stack gap={5} w={{ base: "100%", md: "60%" }}>
          <Heading
            textTransform={"capitalize"}
            size={{ base: "sm", md: "md" }}
            width={"100%"}
            mb={{ base: 2, md: 4 }}
          >
            browse the best deals online for laptops and accessories
          </Heading>
          <Heading
            size={{ base: "md", md: "lg" }}
            display={{ base: "none", md: "block" }}
            textTransform={"uppercase"}
          >
            newest models
          </Heading>
        </Stack>
        {isLoading ? (
          <Skeleton w={"40%"} h={"100px"} />
        ) : (
          <Box className="wrapper" w={{ base: "100%", md: "40%" }}>
            <Splide options={options} hasTrack={false}>
              <Box position={"relative"}>
                <SplideTrack>
                  {images?.map((slide, index) => (
                    <Box
                      as={SplideSlide}
                      key={index}
                      display={"flex"}
                      justifyContent={"center"}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.image}
                        objectFit={"contain"}
                        h={"100%"}
                        w={"100%"}
                        mr={10}
                      />
                    </Box>
                  ))}
                </SplideTrack>
              </Box>
            </Splide>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Banner;
