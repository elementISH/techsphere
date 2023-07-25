import { Box, Card, CardBody, Heading, Image, Text } from "@chakra-ui/react";

const CheckoutProductCard = ({ name, image, price, quantity }) => {
  return (
    <Card variant="outline">
      <Image src={image} alt={name} maxH={48} objectFit="contain" />
      <CardBody p={0} pb={5}>
        <Box textAlign="center">
          <Heading size="xs">{name}</Heading>
          <Text size="xs">${price}</Text>
          <Text size="xs">quantity: {quantity}</Text>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CheckoutProductCard;
