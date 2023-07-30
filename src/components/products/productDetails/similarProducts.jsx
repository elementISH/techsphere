import Card from "@/components/generics/card";
import Statement from "@/components/generics/statement";
import { Box, Image } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function ArrowStyle() {
  const arrowStyle = `
    .similar-products .splide__arrows{
      display: flex;
      position: absolute;
      top: -2.5rem;
      right: 0;
      gap: 10px;
    }
    .similar-products .splide__arrow {
      position: unset;
      background: none;
      border: 1px solid #008ECC;
    }
    .similar-products .splide__arrow svg{
      fill: #313131;
    }
    @media (max-width: 590px) {
    .similar-products .splide__arrows {
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

const SimilarProducts = () => {
  const [perView, setPerView] = React.useState("5");
  const { products } = useSelector((state) => state.productsReducer.value);
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
      <Box mb={"5rem"} mt={10} className="similar-products">
        <Statement
          statement={"Browse similar products now"}
          emtext={"similar products"}
          size={"md"}
        />
        <Box className="wrapper">
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
        </Box>
      </Box>
    </>
  );
};

export default SimilarProducts;
