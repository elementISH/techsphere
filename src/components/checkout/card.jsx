import { Box, Card, CardBody, Heading, Image } from "@chakra-ui/react";

const CheckoutProductCard = ({ name, image }) => {
  return (
    <Card variant="outline">
      <Image src={image} alt={name} maxH={48} objectFit="contain" />
      <CardBody p={0} pb={5}>
        <Box textAlign="center">
          <Heading size="xs">{name}</Heading>
        </Box>
      </CardBody>
    </Card>
  );
};

export default CheckoutProductCard;
