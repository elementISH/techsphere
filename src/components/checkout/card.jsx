import {
  Badge,
  Box,
  Card,
  CardBody,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";

const CheckoutProductCard = ({ name, image, price, quantity, discount }) => {
  return (
    <>
      <Card variant="outline">
        {discount > 0 ? (
          <Badge
            colorScheme="red"
            position={"absolute"}
            right={0}
            w={"50px"}
            textAlign={"center"}
            top={"1rem"}
            transform={"rotate(45deg)"}
            zIndex={99}
          >
            {discount}%
          </Badge>
        ) : null}
        <Image
          src={image}
          alt={name}
          maxH={48}
          objectFit="contain"
          position={"relative"}
        />
        <CardBody p={0} pb={5}>
          <Box textAlign="center">
            <Heading size="xs">{name}</Heading>
            <Text size="xs">${price}</Text>
            <Text size="xs">quantity: {quantity}</Text>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};

export default CheckoutProductCard;
