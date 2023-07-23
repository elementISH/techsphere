import { Box, Flex, Image } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect, useRef } from "react";

function ArrowStyle() {
  const arrowStyle = `
    .splide__arrow {
      opacity: 1
    }
  `;
  return <style>{arrowStyle}</style>;
}

const mainOptions = {
  type: "loop",
  perPage: 1,
  perMove: 1,
  gap: "1rem",
  pagination: false,
};

const thumbsOptions = {
  type: "slide",
  rewind: true,
  gap: "1rem",
  pagination: false,
  cover: true,
  height: 110,
  fixedWidth: 110,
  isNavigation: true,
  arrows: false,
};

const ProductCarousel = ({ images, image }) => {
  const mainRef = useRef(null);
  const thumbsRef = useRef(null);

  useEffect(() => {
    if (mainRef.current && thumbsRef.current && thumbsRef.current.splide) {
      mainRef.current.sync(thumbsRef.current.splide);
    }
  }, []);

  return (
    <>
      {images.length != 0 ? (
        <>
          <ArrowStyle />
          <Splide options={mainOptions} ref={mainRef}>
            {images?.map((image) => (
              <SplideSlide
                key={image.image_id}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Image
                  src={image.image}
                  w={{ md: "md" }}
                  height={{ md: "md" }}
                />
              </SplideSlide>
            ))}
          </Splide>

          <Splide
            options={thumbsOptions}
            ref={thumbsRef}
            style={{ width: "100%" }}
          >
            {images?.map((image) => (
              <SplideSlide key={image.image_id}>
                <Image src={image.image} alt={image.id} />
              </SplideSlide>
            ))}
          </Splide>
        </>
      ) : (
        <Flex justifyContent={"center"} w={"full"}>
          <Image src={image} w={"md"} h={"md"} />
        </Flex>
      )}
    </>
  );
};

export default ProductCarousel;
