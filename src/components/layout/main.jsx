import { fetchFaqs } from "@/redux/features/faq-slice";
import { fetchFavorites } from "@/redux/features/favorites-slice";
import { fetchFilter, fetchFilterDetails } from "@/redux/features/filter-slice";
import { fetchProducts } from "@/redux/features/products-slice";
import { fetchSlider } from "@/redux/features/slider-slice";
import { fetchToken } from "@/redux/features/token-slice";
import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Center,
  Container,
  Heading,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ChevronRight } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
function getPathDetails(path) {
  if (path === "/") {
    return "home";
  }

  const trimmedStr = path.replace(/^\/+|\/+$/g, ""); // Remove slashes from beginning and end
  const replacedStr = trimmedStr.replace(/\//g, " - "); // Replace remaining slashes with hyphens

  return replacedStr;
}
const Main = ({ children }) => {
  const path = getPathDetails(usePathname());
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchSlider());
    dispatch(fetchToken());
    dispatch(fetchFilterDetails());
    dispatch(fetchFilter());
    dispatch(fetchFaqs());
  }, []);
  return (
    <Container
      as={"main"}
      maxW="full"
      px={"20px"}
      bg="primary.200"
      pt={"20px"}
      height="100%"
      overflow={"hidden"}
      minH={"calc(100vh - 60px)"}
      alignItems={"center"}
    >
      <Stack>
        <Heading
          color="primary.500"
          textAlign={"center"}
          textTransform={"capitalize"}
        >
          {path}
        </Heading>
        <Breadcrumb spacing="8px" mx={"auto"} mb={"20px"} textAlign="center">
          {path != "home" ? (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <Icon
                as={ChevronRight}
                color="primary.500"
                display={"flex"}
                mx={2}
              />
              <BreadcrumbItem
                isCurrentPage
                color="primary.500"
                fontWeight={"bold"}
              >
                <BreadcrumbLink>{path}</BreadcrumbLink>
              </BreadcrumbItem>
            </>
          ) : null}
        </Breadcrumb>
      </Stack>
      <Container
        maxW={"container.xl"}
        centerContent
        justifyContent={"center"}
        minH={"calc(100vh - 250px)"}
      >
        <Box w={"100%"}>{children}</Box>
      </Container>
    </Container>
  );
};

export default Main;
