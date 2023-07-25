import { updateCart } from "@/redux/features/cart-slice";
import { API_URL } from "@/utils/constants";
import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Heading,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const ProfileFavoriteCard = ({ id, name, image, price }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.authReducer.value);
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
      <Card overflow="hidden" variant="outline">
        <Stack
          justifyContent={"space-between"}
          w={"100%"}
          direction={{ base: "column", sm: "row" }}
          alignItems={"center"}
        >
          <CardBody
            display={"flex"}
            flexDirection={{ base: "column", md: "row" }}
            alignItems={"center"}
            gap={4}
          >
            <Image
              src={image}
              objectFit="cover"
              maxW={{ base: "100%", sm: "150px" }}
              p={5}
            />
            <Box>
              <Heading size="md">{name}</Heading>
              <Text pt={2}>${price}</Text>
            </Box>
          </CardBody>

          <CardFooter>
            <ButtonGroup>
              <Button
                variant={"outline"}
                borderColor={"primary.500"}
                as={Link}
                href={`/products/${id}`}
              >
                view product
              </Button>
              <Button color={"primary.100"} onClick={handleAddToCart}>
                order product
              </Button>
            </ButtonGroup>
          </CardFooter>
        </Stack>
      </Card>
    </>
  );
};

export default ProfileFavoriteCard;
